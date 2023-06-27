import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FormatResponseInterceptor, USER_API } from '@/shared';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user.dto';
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

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.login(loginDto);

    this.userService.sendToken(user, HttpStatus.OK, res);
  }
}
