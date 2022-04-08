import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersType } from '../users/users.model';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/google/callback')
  googleAuthRedirect(@Body() newUserData: UsersType) {
    return this.authService.googleLogin(newUserData);
  }
}
