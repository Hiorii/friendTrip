import {Component, Input, OnInit} from '@angular/core';
import { MapDirectionsService } from "@angular/google-maps";
import {map, Observable} from "rxjs";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() tripPoints: TripPointDataModel

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    center: { lat: 52.779242, lng: 15.205320 },
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

//  marker1 = { position: { lat: 52.779242, lng: 5.205320 } };

  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral[] = [ ];
  markerLabel: google.maps.MarkerLabel = {text: "Some"}

  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    this.markerLabel.text = 'tex'
  }

  constructor(private mapDirectionsService: MapDirectionsService) {   console.log('cons', this.tripPoints) }

  ngOnInit(): void {
    console.log('ng', this.tripPoints)
    this.setCenterPoints()

    const request: google.maps.DirectionsRequest = {
      destination: {lat: +this.tripPoints?.destinationPoint?.latitude, lng: +this.tripPoints?.destinationPoint?.longitude},
      origin: {lat: +this.tripPoints?.startPoint?.latitude, lng: +this.tripPoints?.startPoint?.longitude},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lng: +this.tripPoints?.destinationPoint?.longitude,
        lat: +this.tripPoints?.destinationPoint?.latitude
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  private setCenterPoints() {
    this.options.center.lng = this.tripPoints?.destinationPoint?.longitude
    this.options.center.lat = this.tripPoints?.destinationPoint?.latitude
  }
}
