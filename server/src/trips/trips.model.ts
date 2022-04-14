import * as mongoose from 'mongoose';
import { TravelPointsModel } from './travel-points/travel-points.model';
import { UsersType } from '../users/users.model';

export const TripsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  travelPoints: {
    startPoint: {
      address: { type: String, required: true },
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    destinationPoint: {
      address: { type: String, required: true },
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
  },
  tripUsers: [
    {
      userId: { type: String, required: true, ref: 'User' },
    },
  ],
  // pointsToVisit: [{}],
  // totalCost: {},
  // status: { modelfor active, finished }
  // photos: [{}],
});

export interface TripsType {
  title: string;
  travelPoints: {
    startPoint: TravelPointsModel;
    destinationPoint: TravelPointsModel;
  };
  tripUsers: UsersType[];
}

const Trip = mongoose.model('Trip', TripsSchema);
