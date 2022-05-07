import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripsType } from './trips.model';
import { TravelPointsModel } from './travel-points/travel-points.model';
import { UsersType } from '../users/users.model';
import {TripsModule} from "./trips.module";

@Injectable()
export class TripsService {
  // constructor(
  //   @InjectModel('Users') private readonly TripsModule: Model<UsersType>,
  // ) {}

  // async getAllUserTrips(): Promise<TripsType[]> {
  //   return this.TripsModule.findOne({ usersTrips: [] });
  // }

  // async getUserTrip(id: string): Promise<TripsType> {
  //   return this.usersTripsModule.findOne({ id });
  // }
  //
  // async addNewUserTrip(tripData: TripsType): Promise<TripsType> {
  //   const newTrip = new this.usersTripsModule({
  //     travelInfoData: tripData.travelInfoData,
  //     travelPoints: {
  //       startPoint: tripData.travelPoints.startPoint,
  //       destinationPoint: tripData.travelPoints.destinationPoint,
  //     },
  //     tripUsers: tripData.tripUsers,
  //   });
  //
  //   await newTrip.save();
  //
  //   return newTrip;
  // }
}
