import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, NgForm} from "@angular/forms";
import {TripModel} from "../../core/interfaces/trip.model";
import {Store} from "@ngrx/store";
import {getTripsDataAction} from "../../core/store/trips/trips.actions";
import {selectAllTripsList, selectCurrentTrip} from "../../core/store/trips";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {selectCurrentUser} from "../../core/store/users";
import {UsersModel} from "../../core/interfaces/users.model";

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent implements OnInit {
  tripsList$ = this.store.select(selectAllTripsList)

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(user => {
      if (user.email) {
        this.store.dispatch(getTripsDataAction({ currentUser: user }))
      }
    })
  }
}
