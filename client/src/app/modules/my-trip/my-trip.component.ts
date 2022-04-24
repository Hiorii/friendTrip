import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm} from "@angular/forms";
import {TripModel} from "../../core/interfaces/trip.model";
import {Store} from "@ngrx/store";
import {getTripsDataAction} from "../../core/store/trips/trips.actions";

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent implements OnInit {
  tripsList: TripModel[]

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.dispatch(getTripsDataAction())


  }

}
