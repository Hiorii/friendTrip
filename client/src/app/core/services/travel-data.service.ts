import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";
import {TravelPointDataModel} from "../interfaces/travel-point-data.model";

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  travelInfoData = new Subject()
  travelPointData = new Subject<TravelPointDataModel>()

  constructor() { }

  handleTravelPointData(data: TravelPointDataModel) {
    this.travelPointData.next(data)
  }

  handleTravelInfoData(data: any) {
    this.travelInfoData.next(data)
  }
}
