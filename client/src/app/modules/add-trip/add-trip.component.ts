import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TravelDataService} from "../../core/services/travel-data.service";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  travelPointData: Subscription

  constructor(private travelDataService: TravelDataService) { }

  ngOnInit(): void {
    this.travelDataService.travelPointData.subscribe(data => {
      console.log(data)
    })
  }

  handleTravelPointData() {

  }
}
