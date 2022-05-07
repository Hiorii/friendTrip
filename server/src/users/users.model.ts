import * as mongoose from 'mongoose';
import {TripsSchema, TripsType} from '../trips/trips.model';

export const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  photo: { type: String },
  creationDate: { type: Date, required: true },
  usersTrips: { type: [TripsSchema] },
  isActive: { type: Boolean, required: true },
  _token: { type: String },
  _tokenExpirationData: { type: Date },
});

export interface UsersType {
  _id?: string;
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  photo?: string;
  creationDate?: Date;
  usersTrips: TripsType[];
  isActive?: boolean;
  _token?: string;
  _tokenExpirationData?: Date;
}

const User = mongoose.model('User', UsersSchema);
