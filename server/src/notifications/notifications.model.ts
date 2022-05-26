import * as mongoose from 'mongoose';
import { UsersSchema, UsersType } from '../users/users.model';

export const NotificationSchema = new mongoose.Schema({
  type: { type: Number },
  from: { type: [UsersSchema] },
});

export interface NotificationsModel {
  _id?: string;
  type: number;
  from: UsersType;
}

const Notification = mongoose.model('Notifications', NotificationSchema);
