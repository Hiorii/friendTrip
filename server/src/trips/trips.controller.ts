import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripsService } from './trips.service';
import { UsersType } from '../users/users.model';
import { TripsType } from './trips.model';

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

  @Post()
  async addNewTrip(@Body() newTripData: TripsType) {
    const newTrip = await this.tripService.addNewTrip(newTripData);

    return newTrip;
  }
}
