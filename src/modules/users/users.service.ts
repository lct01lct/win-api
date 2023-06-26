import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: CreateUserDto) {
    const { username, email, password, passwordConfirm } = user;

    const newUser = await this.userModel.create({ username, email, password, passwordConfirm });

    return newUser;
  }
}
