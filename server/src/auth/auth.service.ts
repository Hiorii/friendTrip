import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async googleLogin(newUserData) {
    if (!newUserData.email) {
      return 'No user from google found...';
    } else {
      await this.userService.addNewUser(newUserData);

      return {
        message: 'User Info from Google',
        user: newUserData,
      };
    }
  }

  async register(newUserData) {
    await this.userService.addNewUser(newUserData);

    return {
      message: 'User Info from Register',
      user: newUserData,
    };
  }

  async login(newUserData, response) {
    await this.userService.userLogin(newUserData, response);

    return {
      message: 'User Info from Register',
      user: newUserData,
    };
  }

  async getAuthUser(request) {
    await this.userService.user(request);
  }

  async logout(response) {
    await this.userService.userLogout(response);
  }
}
