import {TripModel} from "./trip.model";
import {NotificationModel} from "./notification.model";

export interface UsersModel {
  _id?: string;
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  photo?: string;
  creationDate: Date;
  usersTrips: TripModel[],
  isActive: boolean;
  _token?: string;
  _tokenExpirationData?: Date;
  notifications?: NotificationModel[];
}
