import { User } from '@/modules/user/user.schema';
import { RequestWithUser } from '@/types';
import { AppError } from '@/utils';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { LOGGEDOUTMESS } from '../constants';

@Injectable()
export class ProtectMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    let token = '';

    // @ts-ignore
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.[process.env.JWT_KEY!]) {
      token = req.cookies[process.env.JWT_KEY!];
    }

    if (!token || token === LOGGEDOUTMESS) {
      throw new AppError('You are not logged in! Please log in to get access.', 401);
    }

    try {
      // @ts-ignore

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (typeof decoded === 'string') throw new AppError('Jwt parse went wrong!', 401);

      const currentUser = await this.userModel.findById(decoded.id);

      if (!currentUser)
        throw new AppError('The user belonging to this token does no longer exist.', 401);

      req.user = currentUser;
      next();
    } catch {
      throw new AppError('Jwt parse went wrong!', 401);
    }
  }
}
