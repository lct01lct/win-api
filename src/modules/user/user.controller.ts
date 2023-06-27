import { Body, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  AuthGuard,
  FormatResponseInterceptor,
  Roles,
  USER_API,
  USER_INFO_API,
  Users,
} from '@/shared';
import { UserService } from './user.service';
import { Role } from '@/types';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './user.dto';

@Controller(USER_API)
@UseGuards(AuthGuard)
@UseInterceptors(FormatResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin, Role.User)
  @Get(USER_INFO_API)
  async getMe(@Users('_id') id: ObjectId) {
    return await this.userService.getMe(id);
  }

  @Roles(Role.Admin, Role.User)
  @Patch(USER_INFO_API)
  async updateMe(@Users('_id') id: ObjectId, @Body() updateMeDto: UpdateUserDto) {
    return await this.userService.updateMe(id, updateMeDto);
  }

  @Roles(Role.Admin)
  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return { length: users.length, users };
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
}