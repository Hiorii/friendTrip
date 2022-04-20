import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";
<<<<<<< HEAD
import {TripPointDataModel} from "../interfaces/trip-point-data.model";
import {TripInfoDataModel} from "../interfaces/trip-info-data.model";
=======
import {TravelPointDataModel} from "../interfaces/travel-point-data.model";
import {TravelInfoModel} from "../interfaces/travel-info.model";
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8
import {UsersModel} from "../interfaces/users.model";

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
<<<<<<< HEAD
  travelInfoData = new Subject<TripInfoDataModel>()
  travelPointData = new Subject<TripPointDataModel>()
  travelUsers = new Subject<UsersModel[]>()
=======
  travelInfoData = new Subject<TravelInfoModel>()
  travelPointData = new Subject<TravelPointDataModel>()
  travelUserData = new Subject<UsersModel[]>()
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8

  constructor() { }

  handleTravelPointData(data: TripPointDataModel) {
    this.travelPointData.next(data)
  }

<<<<<<< HEAD
  handleTravelInfoData(travelInfoData: TripInfoDataModel) {
    this.travelInfoData.next(travelInfoData)
  }

  handleTravelUsersData(travelUsersData: any) {
    this.travelUsers.next(travelUsersData)
=======
  handleTravelInfoData(data: TravelInfoModel) {
    this.travelInfoData.next(data)
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8
  }

  handleTravelUserData(data: UsersModel[]) {
    this.travelUserData.next(data)
  }
}
