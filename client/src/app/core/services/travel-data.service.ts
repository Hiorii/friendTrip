import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";
import {TripPointDataModel} from "../interfaces/trip-point-data.model";
import {TripInfoDataModel} from "../interfaces/trip-info-data.model";
import {TravelInfoModel} from "../interfaces/travel-info.model";
import {UsersModel} from "../interfaces/users.model";

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  travelInfoData = new Subject<TripInfoDataModel>()
  travelPointData = new Subject<TripPointDataModel>()
  travelUsers = new Subject<UsersModel[]>()

  constructor() { }

  handleTravelPointData(data: TripPointDataModel) {
    this.travelPointData.next(data)
  }

  handleTravelInfoData(travelInfoData: TripInfoDataModel) {
    this.travelInfoData.next(travelInfoData)
  }

  handleTravelUsersData(travelUsersData: UsersModel[] | []) {
    this.travelUsers.next(travelUsersData)
  }
}
