import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { USER_API } from '@/shared';
import { UserService } from './users.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { Response } from 'express';

@Controller(USER_API)
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUser() {
    return this.usersService.getAllUser();
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.usersService.login(loginDto);

    this.usersService.sendToken(user, HttpStatus.OK, res);
  }
}
