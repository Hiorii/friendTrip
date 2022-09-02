import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";
import {MessageModel} from "../../interfaces/message.model";
import {MarkerModel} from "../../interfaces/marker.model";
import {VotingStatusModel} from "../../enums/voting-status.model";
import {WaypointsModel} from "../../interfaces/waypoints.model";
import {TripItemModel} from "../../interfaces/trip-item.model";
import {CarModel} from "../../interfaces/car.model";

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

  removeTrip(currentUser: string, tripId: string) {
    const params = new HttpParams().set('id', tripId).append('email', currentUser);

    return this.http.delete(this.url + `trip/${tripId}`, {params})
  }

  addNewMessages(id: string, messages: MessageModel[]) {
    return this.http.put(this.url + `trip/${id}/messages`, {messages})
  }

  addNewMarkers(id: string, currentUser: string, markers: MarkerModel[]) {
    return this.http.put(this.url + `trip/${id}/markers`, {currentUser, markers})
  }

  addNewWaypoints(id: string, currentUser: string, waypoints: WaypointsModel) {
    return this.http.put(this.url + `trip/${id}/waypoints`, {currentUser, waypoints})
  }

  removeMarker(id: string, currentUser: string, markerId: string) {
    const params = new HttpParams().set('id', id).append('markerId', markerId);

    return this.http.delete(this.url + `trip/${id}/markers`, {params})
  }

  removeWaypoint(id: string, currentUser: string, waypointId: string) {
    const params = new HttpParams().set('id', id).append('waypointId', waypointId);

    return this.http.delete(this.url + `trip/${id}/waypoints`, {params})
  }

  voteOnMarker(id: string, currentUser: UsersModel, votingStatus: VotingStatusModel) {
    return this.http.put(this.url + `trip/${id}/markers/vote`, {currentUser, votingStatus})
  }

  addNewUserCar(userCarData: any) {
    return this.http.post(this.url + 'cars', userCarData);
  }

  addTripDistance(id: string, currentUser: string, distance: number) {
    return this.http.put(this.url + `trip/${id}/distance`, {currentUser, distance})
  }

  addTripDuration(id: string, currentUser: string, duration: string) {
    return this.http.put(this.url + `trip/${id}/duration`, {currentUser, duration})
  }

  addNewTripItem(id: string, currentUser: string, item: TripItemModel) {
    return this.http.put(this.url + `trip/${id}/items`, {currentUser, item})
  }

  removeTripItem(id: string, currentUser: string, itemId: string) {
    const params = new HttpParams().set('id', id).append('itemId', itemId);

    return this.http.delete(this.url + `trip/${id}/items`, {params})
  }

  addTripCar(id: string, currentUser: string, car: CarModel) {
    return this.http.put(this.url + `trip/${id}/car`, {currentUser, car})
  }
}
