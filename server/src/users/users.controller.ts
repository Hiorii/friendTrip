import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersType } from './users.model';
import { MessageModel } from '../chat/message.model';
import { MarkersModel } from '../trips/markers.model';
import { VotingStatusModel } from '../trips/voting-status.enum';
import { WaypointsModel } from '../trips/waypoints.model';
import { CarModel } from './car.model';
import { TripItemModel } from '../trips/trip-items.model';

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

  @Delete('trip/:id')
  async removeUserTrip(@Param('id') id: string, @Query() query) {
    return this.userService.removeUserTrip(id, query);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id).then((data) => console.log(data));
  }

  @Post('/cars')
  async addUserCar(@Body() userCarData: any) {
    return this.userService.addUserCar(userCarData);
  }

  // @Post()
  // async addNewUser(@Body() newUserData: UsersType) {
  //   const newUser = await this.userService.addNewUser(newUserData);
  //
  //   return newUser;
  // }

  @Put('trips')
  async addNewUserTrip(@Body() newTripData: CarModel) {
    return this.userService.addNewUserTrip(newTripData);
  }

  @Put('trip/:id/messages')
  async addMessagesToTrip(
    @Param('id') id: string,
    @Body() messages: MessageModel[],
  ) {
    return this.userService.addMessagesToTrip(id, messages);
  }

  @Put('trip/:id/markers')
  async addMarkersToTrip(
    @Param('id') id: string,
    @Body() currentUser: string,
    @Body() markers: MarkersModel[],
  ) {
    return this.userService.addMarkersToTrip(id, currentUser, markers);
  }

  @Delete('trip/:id/markers')
  async removeMarkersFromTrip(@Param('id') id: string, @Query() query) {
    return this.userService.removeMarkerFromTrip(id, query);
  }

  @Put('trip/:id/markers/vote')
  async voteOnMarker(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() votingStatus: VotingStatusModel,
  ) {
    return this.userService.voteOnMarker(id, currentUser, votingStatus);
  }

  @Put('trip/:id/waypoints')
  async addNewWaypoints(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() waypoints: WaypointsModel,
  ) {
    return this.userService.addNewWaypoints(id, currentUser, waypoints);
  }

  @Delete('trip/:id/waypoints')
  async removeWaypointsFromTrip(@Param('id') id: string, @Query() query) {
    return this.userService.removeWaypointsFromTrip(id, query);
  }

  @Put('trip/:id/distance')
  async addTripDistance(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() distance: number,
  ) {
    return this.userService.addTripDistance(id, currentUser, distance);
  }

  @Put('trip/:id/duration')
  async addTripDuration(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() duration: string,
  ) {
    return this.userService.addTripDuration(id, currentUser, duration);
  }

  @Put('trip/:id/items')
  async addNewTripItem(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() item: TripItemModel,
  ) {
    return this.userService.addNewTripItem(id, currentUser, item);
  }

  @Put('trip/:id/itemsAlreadyPaid')
  async addNewTripItemAlreadyPaid(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() alreadyPaid: { tripId: string; user: string; amount: number },
  ) {
    return this.userService.addNewTripItemAlreadyPaid(
      id,
      currentUser,
      alreadyPaid,
    );
  }

  @Delete('trip/:id/items')
  async removeTripItem(@Param('id') id: string, @Query() query) {
    return this.userService.removeTripItem(id, query);
  }

  @Put('trip/:id/car')
  async addTripCar(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() car: CarModel,
  ) {
    return this.userService.addTripCar(id, currentUser, car);
  }

  @Put('trip/:id/fuelCost')
  async addTripFuelCost(
    @Param('id') id: string,
    @Body() currentUser: UsersType,
    @Body() fuelCost: number,
  ) {
    return this.userService.addTripFuelCost(id, currentUser, fuelCost);
  }
}
