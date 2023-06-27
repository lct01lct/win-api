import { Body, Controller, Get, HttpCode, Param, Post, Res, UseInterceptors } from '@nestjs/common';
import { FormatResponseInterceptor, USER_API } from '@/shared';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller(USER_API)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(FormatResponseInterceptor)
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return { length: users.length, users };
  }

  @Get(':id')
  @UseInterceptors(FormatResponseInterceptor)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
}
