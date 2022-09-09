import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {TripModel} from "../../../core/interfaces/trip.model";
import { removeTripUsersAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Router} from "@angular/router";
import {UsersModel} from "../../../core/interfaces/users.model";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit, OnChanges {
  @Input() tripList: TripModel[]
  @Input() currentUser: UsersModel;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.tripList = changes['tripList']?.currentValue;
  }

  openSingleTrip(trip: any) {
    this.router.navigate([`/my-trips/${trip._id}`])
  }

  removeTrip(id: string) {
    this.store.dispatch(removeTripUsersAction({ currentUser: this.currentUser.email, tripId: id }))
  }
}
