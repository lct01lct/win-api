import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { AppError } from '@/utils';

@Injectable()
export class UserService {
  static JWT_KYE = process.env.JWT_KEY;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUser() {
    return await this.userModel.find();
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new AppError('Invalid ID!', 400);

    return user;
  }

  async createUser(user: CreateUserDto) {
    const { username, email, password, passwordConfirm } = user;
    const newUser = await this.userModel.create({ username, email, password, passwordConfirm });

    // @ts-ignore
    newUser.password = undefined;
    return newUser;
  }

  async createMultiUser(users: CreateUserDto[]) {
    return await Promise.all(users.map(user => this.createUser(user)));
  }

  async deleteAllUser() {
    await this.userModel.deleteMany();
  }
}
