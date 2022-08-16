import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {MapDirectionsService} from "@angular/google-maps";
import {map, Observable} from "rxjs";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() tripPoints: TripPointDataModel
  @Input() isMarkerAdded: boolean

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

  markers = [];

  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

  addMarker(event: google.maps.MapMouseEvent) {
    if (this.isMarkerAdded) {
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        label: {
          color: 'black',
          text: this.currentUser.name,
        },
        title: UUID.UUID(),
        options: {
          draggable: true,
          clickable: true,

          // animation: google.maps.Animation.BOUNCE
        },
      });
    }
  }

  constructor(
    private mapDirectionsService: MapDirectionsService,
    private localStorageService: LocalStorageService,
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
  markerClick(event) {
    this.markers.forEach(marker => {
      if (event.latLng.lat() === marker.position.lat && event.latLng.lng() === marker.position.lng) {
        this.showMarkerDetails(marker)
      }
    })
  }

  private setCenterPoints() {
    this.options.center.lng = this.tripPointsToTravel?.destinationPoint?.longitude
    this.options.center.lat = this.tripPointsToTravel?.destinationPoint?.latitude
  }

  private showMarkerDetails(marker) {

  }
}
