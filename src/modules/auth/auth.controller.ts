import { AUTH_API } from '@/shared';
import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user';
import { LoginDto, SignupDto } from './auth.dto';
import { Response } from 'express';

@Controller(AUTH_API)
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('signup')
  async createUser(@Body() signupDto: SignupDto) {
    return await this.userService.createUser(signupDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.login(loginDto);

    return this.authService.sendToken(user, res);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
