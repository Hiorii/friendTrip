import * as mongoose from 'mongoose';
import { TravelPointsModel } from './travel-points/travel-points.model';
import { UsersType } from '../users/users.model';
import { TravelInfoModel } from './travel-info/travel-info.model';

export const TripsSchema = new mongoose.Schema({
  travelInfoData: {
    travelName: { type: String, required: true },
    travelPlannedTotalCost: { type: Number },
    travelPhoto: { type: String },
    travelPlannedStartDate: { type: Date },
    travelPlannedEndDate: { type: Date },
  },
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
  tripUsers: [],
  // pointsToVisit: [{}],
  // totalCost: {},
  // status: { modelfor active, finished }
  // photos: [{}],
});

export interface TripsType {
  travelInfoData: TravelInfoModel;
  travelPoints: {
    startPoint: TravelPointsModel;
    destinationPoint: TravelPointsModel;
  };
  tripUsers?: UsersType[];
  _id?: string;
}

const Trip = mongoose.model('Trip', TripsSchema);
