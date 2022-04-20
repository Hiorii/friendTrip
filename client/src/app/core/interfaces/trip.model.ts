import {TripInfoDataModel} from "./trip-info-data.model";
import {TripPointsModel} from "./trip-points.model";
import {UsersModel} from "./users.model";

export interface TripModel {
  _id?: string;
  travelInfoData: TripInfoDataModel;
  travelPoints: TripPointsModel;
  tripUsers?: UsersModel[];
}
