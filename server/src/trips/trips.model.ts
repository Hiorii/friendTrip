import * as mongoose from 'mongoose';
import { TravelPointsModel } from './travel-points/travel-points.model';
import { UsersType } from '../users/users.model';
import { TravelInfoModel } from './travel-info/travel-info.model';
import {MessageModel} from "../chat/message.model";
import {MarkersModel} from "./markers.model";
import {WaypointsModel} from "./waypoints.model";
import {TripItemModel} from "./trip-items.model";
import {CarModel} from "../users/car.model";

export const TripsSchema = new mongoose.Schema({
  id: { type: String, required: true },
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
  creator: '',
  tripUsers: [],
  messages: [],
  markers: [],
  waypoints: [],
  totalTripDistance: '',
  totalTripDuration: '',
  tripItems: [],
  tripCar: '',
  tripFuelCost: { type: Number },
  // pointsToVisit: [{}],
  // totalCost: {},
  // status: { modelfor active, finished }
  // photos: [{}],
});

export interface TripsType {
  id: string;
  travelInfoData: TravelInfoModel;
  travelPoints: {
    startPoint: TravelPointsModel;
    destinationPoint: TravelPointsModel;
  };
  creator: UsersType;
  tripUsers?: UsersType[];
  messages?: MessageModel[];
  markers?: MarkersModel[];
  waypoints?: WaypointsModel[];
  totalTripDistance?: number;
  totalTripDuration?: string;
  tripItems?: TripItemModel[];
  _id?: string;
  tripCar?: CarModel;
  tripFuelCost?: number;
}

const Trip = mongoose.model('Trip', TripsSchema);
