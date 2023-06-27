import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
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
    const newUser = await this.userModel.create(user);

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

  async getMe(id: ObjectId) {
    return await this.userModel.findById(id);
  }

  async updateMe(id: ObjectId, updateMeDto: UpdateUserDto) {
    // @ts-ignore
    if (updateMeDto['password']) {
      throw new AppError('This route is not for password updates. Please contact admin', 400);
    }

    // @ts-ignore
    if (updateMeDto['role']) {
      throw new AppError('This route is not for role updates. Please contact admin', 403);
    }

    return await this.userModel.findByIdAndUpdate(id, updateMeDto, {
      runValidators: true,
      new: true,
    });
  }
}
