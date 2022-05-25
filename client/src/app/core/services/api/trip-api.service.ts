import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";
import {MessageModel} from "../../interfaces/message.model";

@Injectable({
  providedIn: 'root'
})
export class TripApiService {
  url = 'http://localhost:3000/api/users/'

  constructor(private http: HttpClient) { }

  getAllTrips(currentUser: any) {
    const params = new HttpParams().append('userEmail', currentUser.email);

    return this.http.get<UsersModel>(this.url + 'trips', { params })
  }

  getSingleTrip(currentUser: any, id: string) {
    const params = new HttpParams().set('id', id).append('userEmail', currentUser);

    return this.http.get<TripModel>(this.url + 'trip', { params })
  }

  addNewTrip(currentUser: UsersModel, tripData: TripModel) {
    return this.http.put(this.url + 'trips', {currentUser, tripData})
  }

  addNewMessages(id: string, messages: MessageModel[]) {
    return this.http.put(this.url + `trip/${id}/messages`, {messages})
  }
}
