import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  travelPointData = new Subject()

  constructor() { }

  handleTravelPointData(data: any) {
    this.travelPointData.next({travelPointData: data})
  }
}
