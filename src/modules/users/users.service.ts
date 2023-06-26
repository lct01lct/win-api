import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { STATUS } from '@/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUser() {
    return await this.userModel.find();
  }

  async createUser(user: CreateUserDto) {
    const { username, email, password, passwordConfirm } = user;

    const newUser = await this.userModel.create({ username, email, password, passwordConfirm });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const { password, username } = loginDto;

    if (!password || !username)
      throw new UnauthorizedException('Please provide username and password!');

    const user = await this.userModel.findOne({ username }).select('+password');

    if (!user) throw new UnauthorizedException('Incorrect username or password!');

    const correct = user.correctPassword(user.password, password);

    if (!correct) throw new UnauthorizedException('Incorrect username or password!');

    return user;
  }

  async sendToken(user: UserDocument, statusCode: number, res: Response) {
    const token = await this.signToken(user);

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRED_IN!) * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === 'production', // https
      httpOnly: true,
    });

    res.status(statusCode).json({
      status: STATUS.SUCCESS,
      token,
      data: { user },
    });
  }

  async signToken(user: UserDocument) {
    return await jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
  }
}
