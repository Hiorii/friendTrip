import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersType } from './users.model';
import { MessageModel } from '../chat/message.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('currentUser')
  async user(@Query() query) {
    return this.userService.getCurrentUser(query.email);
  }

  @Get('trips')
  async getUserTrips(@Query() query) {
    return this.userService.getUserTrips(query);
  }

  @Get('trip')
  async getUserTrip(@Query() query) {
    return this.userService.getUserTrip(query);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id).then((data) => console.log(data));
  }

  // @Post()
  // async addNewUser(@Body() newUserData: UsersType) {
  //   const newUser = await this.userService.addNewUser(newUserData);
  //
  //   return newUser;
  // }

  @Put('trips')
  async addNewUserTrip(@Body() newTripData: any) {
    return this.userService.addNewUserTrip(newTripData);
  }

  @Put('trip/:id/messages')
  async addMessagesToTrip(
    @Param('id') id: string,
    @Body() messages: MessageModel[],
  ) {
    return this.userService.addMessagesToTrip(id, messages);
  }
}
