import { Injectable } from '@nestjs/common';
import { User, UserDocument, UserService } from '../user';
import { Response } from 'express';
import { STATUS } from '@/types';
import { LoginDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { AppError } from '@/utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    const { password, username } = loginDto;

    if (!password || !username) throw new AppError('Please provide username and password!', 401);

    const user = await this.userModel.findOne({ username }).select('+password');

    if (!user) throw new AppError('Incorrect username or password!', 401);

    const correct = user.correctPassword(user.password, password);

    if (!correct) throw new AppError('Incorrect username or password!', 401);

    return user;
  }

  async logout(res: Response) {
    res.cookie(UserService.JWT_KYE, 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    return {
      status: STATUS.SUCCESS,
    };
  }

  async sendToken(user: UserDocument, res: Response) {
    const token = await this.signToken(user);

    res.cookie(UserService.JWT_KYE, token, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRED_IN!) * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === 'production', // https
      httpOnly: true,
    });

    return {
      status: STATUS.SUCCESS,
      token,
      data: { user },
    };
  }

  async signToken(user: UserDocument) {
    return await jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
  }
}
