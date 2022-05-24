import {NotificationsTypeModel} from "../enums/notifications-type.model";
import {UsersModel} from "./users.model";

export interface NotificationModel {
  _id?: string,
  type: NotificationsTypeModel,
  from: UsersModel,
}
