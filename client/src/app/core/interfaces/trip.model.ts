import {TripInfoDataModel} from "./trip-info-data.model";
import {UsersModel} from "./users.model";
import {TripPointDataModel} from "./trip-point-data.model";
import {MarkerModel} from "./marker.model";
import {WaypointsModel} from "./waypoints.model";
import {TripItemModel} from "./trip-item.model";
import {CarModel} from "./car.model";

export interface TripModel {
  _id?: string;
  id: string;
  travelInfoData: TripInfoDataModel;
  travelPoints: TripPointDataModel;
  creator: UsersModel;
  tripUsers?: UsersModel[];
  messages?: any[];
  markers?: MarkerModel[];
  waypoints?: WaypointsModel[];
  totalTripDistance?: number;
  totalTripDuration?: string;
  tripItems?: TripItemModel[];
  tripCar?: CarModel
  tripFuelCost?: number;
}
