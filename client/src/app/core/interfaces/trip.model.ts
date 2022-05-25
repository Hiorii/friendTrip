import {TripInfoDataModel} from "./trip-info-data.model";
import {TripPointsModel} from "./trip-points.model";
import {UsersModel} from "./users.model";
import {TripPointDataModel} from "./trip-point-data.model";
import {MessageModel} from "./message.model";

export interface TripModel {
  _id?: string;
  id: string;
  travelInfoData: TripInfoDataModel;
  travelPoints: TripPointDataModel;
  tripUsers?: UsersModel[];
  messages?: any[];
}
