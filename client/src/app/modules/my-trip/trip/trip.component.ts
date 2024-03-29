import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectAllTripsList,
  selectCurrentTrip,
  selectTripDistance,
  selectTripDuration,
  selectTripMarkers,
  selectTripWaypoints
} from "../../../core/store/trips";
import {TripModel} from "../../../core/interfaces/trip.model";
import {getTripDataAction, saveTripMarkersAction, setTripDataAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {MarkerModel} from "../../../core/interfaces/marker.model";
import {UsersModel} from "../../../core/interfaces/users.model";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripComponent implements OnInit, OnChanges {
  currentTrip: TripModel;
  currentTripUpdatedArr: UsersModel[];
  isChatVisible: boolean = false;
  isMarkerAdded: boolean = false;
  isCostDetailVisible: boolean = true;
  tripId: string;
  currentUser: any;
  markersList: MarkerModel[];
  markersData$ = this.store.select(selectTripMarkers);
  waypointList$ = this.store.select(selectTripWaypoints);
  totalTripDistance$ = this.store.select(selectTripDistance);
  totalTripDuration$ = this.store.select(selectTripDuration);
  currentTripCreator: UsersModel;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user').email
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.getTripDate(this.currentUser);
    this.setCurrentTripUsers();
  }

  ngOnChanges(changes: SimpleChanges) { }

  showChat(isVisible: boolean): void {
    this.isChatVisible = isVisible;
  }

  handleAddCustomTravelPoint() {
    this.isMarkerAdded = true;
    this.getTripDate(this.currentUser);
  }

  handleCancelAddCustomTravelPoint() {
    this.isMarkerAdded = false;
    this.getTripDate(this.currentUser);
  }

  handleSaveAddCustomTravelPoint() {
    this.store.dispatch(saveTripMarkersAction({ id: this.currentTrip.id, currentUser: this.currentUser, markers: this.markersList }))
  }

  onMarkerListUpdate(markers: MarkerModel[]) {
    this.markersList = markers;
  }

  onHandleTripView(status: boolean) {
    this.isCostDetailVisible = status;
  }

  private getTripDate(user: any) {
    this.store.select(selectCurrentTrip).subscribe(currentTrip => {
      if (currentTrip._id) {
        this.currentTrip = currentTrip
        this.store.dispatch(setTripDataAction({ trip: currentTrip}))
      } else {
        this.store.select(selectAllTripsList).subscribe(trips => {
          if (trips.length) {
            trips.map(trip => {
              if (trip._id === this.tripId) {
                if (trip?.travelPoints?.destinationPoint) {
                  this.currentTrip = trip
                  this.store.dispatch(setTripDataAction({ trip: trip}))
                }
              }
            })
          }
        })
      }
    })

  }

  private setCurrentTripUsers() {
    let currentTripArr = [];

    this.currentTripCreator = this.currentTrip?.creator;
    if (this.currentTrip?.tripUsers?.length) {
      this.currentTrip.tripUsers.map(user => {
        currentTripArr.push(user);
        currentTripArr = currentTripArr.filter(user => user.email !== this.currentUser);
      })

      if (!this.currentTrip.tripUsers.includes(this.currentTripCreator)) {
        currentTripArr.push(this.currentTripCreator)
      }
    }

    this.currentTripUpdatedArr = currentTripArr;
  }
}
