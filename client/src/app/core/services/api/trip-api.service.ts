import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripModel} from "../../interfaces/trip.model";

@Injectable({
  providedIn: 'root'
})
export class TripApiService {
  url = 'http://localhost:3000/api/trips'

  constructor(private http: HttpClient) { }

  getAllTrips() {
    return this.http.get<TripModel[]>(this.url)
  }

  addNewTrip(tripData: TripModel) {
    return this.http.post(this.url, tripData)
  }
}
