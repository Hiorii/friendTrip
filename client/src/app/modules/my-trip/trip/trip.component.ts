import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCurrentTrip} from "../../../core/store/trips";
import {TripModel} from "../../../core/interfaces/trip.model";
import {getTripDataAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {selectCurrentUser} from "../../../core/store/users";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  currentTrip: TripModel

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const currentUser = this.localStorageService.getItem('user').email
    const id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(getTripDataAction({currentUser, id: id}))
    this.store.select(selectCurrentTrip).subscribe(trip => this.currentTrip = trip)
  }
}
