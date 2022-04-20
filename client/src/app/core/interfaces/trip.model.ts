import {TripInfoDataModel} from "./trip-info-data.model";
import {TripPointsModel} from "./trip-points.model";
import {UsersModel} from "./users.model";
import {TripPointDataModel} from "./trip-point-data.model";

export interface TripModel {
  _id?: string;
  travelInfoData: TripInfoDataModel;
  travelPoints: TripPointDataModel;
  tripUsers?: UsersModel[];
}
