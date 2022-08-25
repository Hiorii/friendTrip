import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {MapDirectionsService, MapGeocoder, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {map, Observable} from "rxjs";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {UUID} from "angular2-uuid";
import {TripApiService} from "../../core/services/api/trip-api.service";
import {MarkerModel} from "../../core/interfaces/marker.model";
import {Store} from "@ngrx/store";
import {selectCurrentTrip, selectTripWaypoints} from "../../core/store/trips";
import {TripModel} from "../../core/interfaces/trip.model";
import {selectCurrentUser} from "../../core/store/users";
import {VotingStatusModel} from "../../core/enums/voting-status.model";
import {VoteStatusModel} from "../../core/interfaces/vote-status.model";
import {saveTripWaypointsAction} from "../../core/store/trips/trips.actions";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() tripPoints: TripPointDataModel
  @Input() isMarkerAdded: boolean
  @Input() markersDataForCurrentTrip: MarkerModel[];
  @Output() markersList = new EventEmitter<MarkerModel[]>()

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  $markerData: any;
  tripPointsToTravel: any;
  currentUser: any;
  tripData: TripModel;
  currentMarkerId: string;
  currentMarkerVoteStatus: VoteStatusModel;
  user: any;

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    center: { lat: 52.779242, lng: 15.205320 },
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    // maxZoom: 15,
    // minZoom: 8,
  }

  markers: MarkerModel[] = [];

  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  waypoints: any[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    let voteArr = [];

    if (this.isMarkerAdded) {
      this.tripData.tripUsers.forEach(user => {
        voteArr.push({
          status: VotingStatusModel.unvoted,
          votesCount: 1,
          user: user
        })
      });

      voteArr.push({
        status: VotingStatusModel.unvoted,
        votesCount: 1,
        user: this.tripData.creator
      })

      const markerData = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        label: {
          id: UUID.UUID(),
          color: 'white',
          text: this.currentUser.name.substring(0, 2),
          voteStatus: voteArr,
        },
        title: UUID.UUID(),
        options: {
          draggable: false,
          clickable: true,

          // animation: google.maps.Animation.BOUNCE
        },
      }
      this.markers = [...this.markers, markerData];
    }

    this.markersList.emit(this.markers);
  }

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private localStorageService: LocalStorageService,
    private geocoder: MapGeocoder,
    private tripApiService: TripApiService,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user');
    this.store.select(selectCurrentUser).subscribe(user => this.user = user);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tripPointsToTravel = changes['tripPoints']?.currentValue;
    this.store.select(selectCurrentTrip).subscribe(data => this.tripData = data);

    this.setCurrentTripMarkers(changes);
    this.setCenterPoints();
    this.setWaypoints();

    const request: google.maps.DirectionsRequest = {
      destination: {lat: +this.tripPointsToTravel?.destinationPoint?.latitude, lng: +this.tripPointsToTravel?.destinationPoint?.longitude},
      origin: {lat: +this.tripPointsToTravel?.startPoint?.latitude, lng: +this.tripPointsToTravel?.startPoint?.longitude},
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: this.waypoints
    };

    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lng: +this.tripPointsToTravel?.destinationPoint?.longitude,
        lat: +this.tripPointsToTravel?.destinationPoint?.latitude
      }
    })

    // REMOVE //
    // google.maps.event.addListener(this.markerOptions, "dblclick", (event: any)=> {
    //   console.log(this.markerPositions)
    //   console.log(event)
    // });
  }

  // zoomIn() {
  //   if (this.zoom < this.options.maxZoom) this.zoom++
  // }
  //
  // zoomOut() {
  //   if (this.zoom > this.options.minZoom) this.zoom--
  // }
  markerClick(marker: MapMarker) {
    this.showMarkerDetails(marker)
  }

  onAddMarkerToTrip(markersData: any) {
    const newWayPoints = {
      location: new google.maps.LatLng(markersData.lat,markersData.lng),
      stopover: true
    }

    this.store.dispatch(saveTripWaypointsAction({ id: this.tripData.id, currentUser: this.user, waypoints: newWayPoints }))
  }

  private setCenterPoints() {
    this.options.center.lng = this.tripPointsToTravel?.destinationPoint?.longitude
    this.options.center.lat = this.tripPointsToTravel?.destinationPoint?.latitude
  }

  private showMarkerDetails(marker) {
    this.currentMarkerId = marker._label.id;
    this.currentMarkerVoteStatus = marker._label.voteStatus

    const markerlatlng = {
      lat: parseFloat(marker._position.lat),
      lng: parseFloat(marker._position.lng),
    };

    this.$markerData = this.geocoder.geocode({ location: markerlatlng })

    this.infoWindow.open(marker)
  }

  private setCurrentTripMarkers(changes: SimpleChanges) {
    this.markersDataForCurrentTrip = changes['markersDataForCurrentTrip']?.currentValue;

    if (this.markersDataForCurrentTrip) {
      this.markersDataForCurrentTrip.map((markersData: any) => this.markers = markersData.markers)
    }
  }

  private setWaypoints() {
    const newWaypointsArr = [];

    this.store.select(selectTripWaypoints).subscribe((waypoints: any) => {
      waypoints.forEach(waypoint => {
        newWaypointsArr.push(waypoint.waypoints);

        this.waypoints = newWaypointsArr;
      })
    })
  }
}
