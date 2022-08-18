import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() tripPoints: TripPointDataModel
  @Input() isMarkerAdded: boolean
  @Output() markersList = new EventEmitter<MarkerModel[]>()

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  $markerData: any;
  tripPointsToTravel: any;
  currentUser: any;


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

  addMarker(event: google.maps.MapMouseEvent) {
    if (this.isMarkerAdded) {
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        label: {
          color: 'white',
          text: this.currentUser.name.substring(0,2),
        },
        title: UUID.UUID(),
        options: {
          draggable: true,
          clickable: true,

          // animation: google.maps.Animation.BOUNCE
        },
      });
    }

    this.markersList.emit(this.markers);
  }

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private localStorageService: LocalStorageService,
    private geocoder: MapGeocoder,
    private tripApiService: TripApiService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tripPointsToTravel = changes['tripPoints']?.currentValue;

    this.setCenterPoints();

    const request: google.maps.DirectionsRequest = {
      destination: {lat: +this.tripPointsToTravel?.destinationPoint?.latitude, lng: +this.tripPointsToTravel?.destinationPoint?.longitude},
      origin: {lat: +this.tripPointsToTravel?.startPoint?.latitude, lng: +this.tripPointsToTravel?.startPoint?.longitude},
      travelMode: google.maps.TravelMode.DRIVING
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

  private setCenterPoints() {
    this.options.center.lng = this.tripPointsToTravel?.destinationPoint?.longitude
    this.options.center.lat = this.tripPointsToTravel?.destinationPoint?.latitude
  }

  private showMarkerDetails(marker) {
    const markerlatlng = {
      lat: parseFloat(marker._position.lat),
      lng: parseFloat(marker._position.lng),
    };

    this.$markerData = this.geocoder.geocode({ location: markerlatlng })

    this.infoWindow.open(marker)
  }
}
