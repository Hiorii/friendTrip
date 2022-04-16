import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";
import {TravelPointDataModel} from "../interfaces/travel-point-data.model";
import {TravelInfoModel} from "../interfaces/travel-info.model";
import {UsersModel} from "../interfaces/users.model";

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  travelInfoData = new Subject<TravelInfoModel>()
  travelPointData = new Subject<TravelPointDataModel>()
  travelUserData = new Subject<UsersModel[]>()

  constructor() { }

  handleTravelPointData(data: TravelPointDataModel) {
    this.travelPointData.next(data)
  }

  handleTravelInfoData(data: TravelInfoModel) {
    this.travelInfoData.next(data)
  }

  handleTravelUserData(data: UsersModel[]) {
    this.travelUserData.next(data)
  }
}
