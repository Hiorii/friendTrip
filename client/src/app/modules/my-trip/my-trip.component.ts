import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {getTripsDataAction} from "../../core/store/trips/trips.actions";
import {selectAllTripsList} from "../../core/store/trips";
import {selectCurrentUser} from "../../core/store/users";

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
