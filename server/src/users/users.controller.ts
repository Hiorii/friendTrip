import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersType } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id).then(data => console.log(data));
  }

  // @Post()
  // async addNewUser(@Body() newUserData: UsersType) {
  //   const newUser = await this.userService.addNewUser(newUserData);
  //
  //   return newUser;
  // }
}
