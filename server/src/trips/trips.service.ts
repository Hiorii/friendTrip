import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripsType } from './trips.model';
import { TravelPointsModel } from './travel-points/travel-points.model';
import { UsersType } from '../users/users.model';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel('Trips') private readonly tripsModule: Model<TripsType>,
  ) {}

  async getAllTrips(): Promise<TripsType[]> {
    return this.tripsModule.find().exec();
  }

  async getTrip(id: string): Promise<TripsType> {
    return this.tripsModule.findOne({ id });
  }

  async addNewTrip(tripData: TripsType): Promise<TripsType> {
    const newTrip = new this.tripsModule({
      travelInfoData: tripData.travelInfoData,
      travelPoints: {
        startPoint: tripData.travelPoints.startPoint,
        destinationPoint: tripData.travelPoints.destinationPoint,
      },
      tripUsers: tripData.tripUsers,
    });

    await newTrip.save();

    return newTrip;
  }
}
