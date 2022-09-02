import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectCurrentTrip,
  selectTripDistance,
  selectTripDuration,
  selectTripMarkers,
  selectTripWaypoints
} from "../../../core/store/trips";
import {TripModel} from "../../../core/interfaces/trip.model";
import {getTripDataAction, saveTripMarkersAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {MarkerModel} from "../../../core/interfaces/marker.model";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripComponent implements OnInit, OnChanges {
  currentTrip: TripModel;
  isChatVisible: boolean = false;
  tripId: string;
  isMarkerAdded: boolean = false;
  currentUser: any;
  isCostDetailVisible: boolean = true;
  markersList: MarkerModel[];
  markersData$ = this.store.select(selectTripMarkers);
  waypointList$ = this.store.select(selectTripWaypoints);
  totalTripDistance$ = this.store.select(selectTripDistance);
  totalTripDuration$ = this.store.select(selectTripDuration);

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user').email
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.getTripDate(this.currentUser);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

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
    this.store.dispatch(getTripDataAction({currentUser: user, id: this.tripId}))
    this.store.select(selectCurrentTrip).subscribe(trip => {
      if (trip?.travelPoints?.destinationPoint) {
        this.currentTrip = trip
      }
    })
  }
}
