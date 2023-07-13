import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { AppError } from '@/utils';
import { FileService } from '../file';

@Injectable()
export class UserService {
  static JWT_KYE = process.env.JWT_KEY;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(FileService) private fileService: FileService
  ) {}

  async getAllUser() {
    return await this.userModel.find();
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new AppError('Invalid ID!', 400);

    return { user };
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userModel.create(user);

    // @ts-ignore
    newUser.password = undefined;
    return { user: newUser };
  }

  async createMultiUser(users: CreateUserDto[]) {
    return await Promise.all(users.map(user => this.createUser(user)));
  }

  async deleteAllUser() {
    await this.userModel.deleteMany();
  }

  async getMe(id: ObjectId) {
    const user = await this.userModel.findById(id);
    return { user };
  }

  async updateMe(id: ObjectId, updateMeDto: UpdateUserDto) {
    const updateUser: Partial<User> = {
      username: updateMeDto.username,
      email: updateMeDto.email,
      wallpaper: updateMeDto.wallpaper as string,
    };
    // @ts-ignore
    if (updateMeDto['password']) {
      throw new AppError('This route is not for password updates. Please contact admin', 400);
    }

    // @ts-ignore
    if (updateMeDto['role']) {
      throw new AppError('This route is not for role updates. Please contact admin', 403);
    }

    const wallpaper = updateMeDto['wallpaper'];
    if (wallpaper && typeof wallpaper !== 'string') {
      const newWallpaper = await this.fileService.updateUserFile(id, wallpaper, 'wallpaper', {
        resizeWidth: 3840,
        resizeHeight: 2000,
        toFormat: 'jpeg',
      });

      updateUser.wallpaper = newWallpaper;
    }

    const avatar = updateMeDto['avatar'];
    if (avatar) {
      const newAvatar = await this.fileService.updateUserFile(id, avatar, 'avatar', {
        resizeWidth: 448,
        resizeHeight: 448,
        toFormat: 'jpeg',
      });

      updateUser.avatar = newAvatar;
    }

    const newUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      runValidators: true,
      new: true,
    });

    return { user: newUser };
  }
}
