import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCurrentTrip} from "../../../core/store/trips";
import {TripModel} from "../../../core/interfaces/trip.model";
import {getTripDataAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  currentTrip: TripModel
  isChatVisible: boolean = false;
  tripId: string;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const currentUser = this.localStorageService.getItem('user').email
    this.tripId = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(getTripDataAction({currentUser, id: this.tripId}))
    this.store.select(selectCurrentTrip).subscribe(trip => {
      if (trip?.travelPoints?.destinationPoint) {
        this.currentTrip = trip
      }
    })
  }

  showChat(isVisible: boolean): void {
    this.isChatVisible = isVisible;
  }
}
