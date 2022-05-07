import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {TripModel} from "../../../core/interfaces/trip.model";
import {getTripDataAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  @Input() tripList: TripModel[]

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  openSingleTrip(trip: any) {
    this.router.navigate([`/my-trips/${trip._id}`])
  }
}
