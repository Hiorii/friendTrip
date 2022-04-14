import { Controller, Get, Param } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripService: TripsService) {}

  @Get()
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Get(':id')
  async getTrip(@Param('id') id: string) {
    return this.tripService.getTrip(id);
  }

  // @Post()
  // async addNewUser(@Body() newUserData: UsersType) {
  //   const newUser = await this.userService.addNewUser(newUserData);
  //
  //   return newUser;
  // }
}
