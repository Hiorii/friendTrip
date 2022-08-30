import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MapGeocoder} from "@angular/google-maps";
import {GooglePlacesTypesModel} from "../../../core/interfaces/google-places-types.model";

@Component({
  selector: 'app-waypoints',
  templateUrl: './waypoints.component.html',
  styleUrls: ['./waypoints.component.scss']
})
export class WaypointsComponent implements OnInit, OnChanges {
  @Input() waypointList;
  @Input() tripId;
  @Input() currentUser;

  isHidden: boolean = false;
  waypointsData: any[];
  waypointslatlng: {lat: number, lng: number}[];
  googlePlaceTypes = new GooglePlacesTypesModel();
  upperAlphabet = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  upperAlphabetCounter = 0;

  constructor(private geocoder: MapGeocoder) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.waypointList = changes['waypointList']?.currentValue;

    this.setWaypointDetails();
  }

  toggleIsHidden() {
    this.isHidden = !this.isHidden;
  }

  private setWaypointDetails() {
    if (!this.waypointList) return;
    const waypointLocationArr = [];
    const waypointsDataArr = [];

    this.waypointList.forEach(waypoint => {
      waypointLocationArr.push({
        id: waypoint.waypoints.id,
        location: waypoint.waypoints.location
      })
    })

    this.waypointslatlng = waypointLocationArr;

    if (this.waypointslatlng.length) {
      this.waypointslatlng.forEach((waypointLatLng: any) => {
        this.geocoder.geocode({ location: waypointLatLng.location })
          .subscribe(waypointsData => {
            if (waypointsData.status === 'OK') {
              waypointsDataArr.push({
                id: waypointLatLng.id,
                result: waypointsData.results
              })
            }

            this.setWaypointDetailsFromPlaceId(waypointsDataArr)
          })
      })
    }
  }

  private setWaypointDetailsFromPlaceId(waypointsData: any[]) {
    let waypointsDataArr = [];
    this.upperAlphabetCounter = 0;

    if (waypointsData?.length) {
      waypointsData.map(data => {
        data.result.map(d => {
          d.types.map(type => {
            if ([this.googlePlaceTypes.premise].includes(type)) {
              waypointsDataArr.push({
                id: data.id,
                order: this.upperAlphabet[this.upperAlphabetCounter],
                address: d.formatted_address
              })
              this.upperAlphabetCounter++;
            }
          })
        })
      })
    }
    this.waypointsData = waypointsDataArr;

    this.setGooglePlaceDetails();
  }



  private setGooglePlaceDetails() {
    //if (!this.placeId) return;

    // const map = new google.maps.Map(this.googleMap as HTMLElement)
    // const request = {
    //   placeId: this.placeId,
    //   fields: ['name', 'address_component', 'type', 'formatted_address','icon', 'photos']
    // };
    // const service = new google.maps.places.PlacesService(map);
    // service.getDetails(request, (place, status) => {
    //
    // });
  }
}
