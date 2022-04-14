import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripsType } from './trips.model';

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

  // async addNewUser(userData: TripsType): Promise<TripsType> {
  //   const { email } = userData;
  //   const existingUser = await this.tripsModule.findOne({ email });
  //
  //   if (!existingUser) {
  //     const newUser = new this.tripsModule({
  //       name: userData.name,
  //       surname: userData.surname,
  //       email: userData.email,
  //       password: userData.password,
  //       creationDate: userData.creationDate,
  //       isActive: userData.isActive,
  //     });
  //
  //     await newUser.save();
  //
  //     return newUser;
  //   } else {
  //     return existingUser;
  //   }
  // }
}
