import {Controller, Post, Body, Res, Get, Req, Param, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersType } from '../users/users.model';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/google/callback')
  async googleAuthRedirect(@Body() newUserData: UsersType) {
    return this.authService.googleLogin(newUserData);
  }

  @Post('auth/register')
  async register(@Body() newUserData: UsersType) {
    const hashedPassword = await bcrypt.hash(newUserData.password, 12);

    return this.authService.register({
      ...newUserData,
      password: hashedPassword,
    });
  }

  @Post('auth/login')
  async login(
    @Body() newUserData: UsersType,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(newUserData, response);
  }

  // @Get('auth/user')
  // async user(@Query() query) {
  //   return this.authService.getAuthUser(query.email);
  // }

  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
