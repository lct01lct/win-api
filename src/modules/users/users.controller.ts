import { Body, Controller, Get, Post } from '@nestjs/common';
import { AUTH_API } from 'src/shared';
import { UserService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller(AUTH_API)
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAll() {
    await this.usersService.createUser();
    return 123;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }
}
