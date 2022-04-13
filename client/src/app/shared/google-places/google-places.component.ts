import {Component, OnInit, Output} from '@angular/core';
import {TravelPointModel} from "../../core/interfaces/travelPoint.model";
import {TravelDataService} from "../../core/services/travel-data.service";

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  startPoint: TravelPointModel = {
    address: '',
    latitude: '',
    longitude: ''
  }
  destinationPoint: TravelPointModel = {
    address: '',
    latitude: '',
    longitude: ''
  }

  constructor(private travelDataService: TravelDataService) { }

  ngOnInit(): void {
  }

  handleStartAddressChange(address: any) {
    this.startPoint.address = address.formatted_address
    this.startPoint.latitude = address.geometry.location.lat()
    this.startPoint.longitude = address.geometry.location.lng()
  }

  handleDestinationAddressChange(address: any) {
    this.destinationPoint.address = address.formatted_address
    this.destinationPoint.latitude = address.geometry.location.lat()
    this.destinationPoint.longitude = address.geometry.location.lng()
  }

  confirmTravelPoints() {
    this.travelDataService.handleTravelPointData({
      data: {
        startPoint: this.startPoint,
        destinationPoint: this.destinationPoint
      }
    })
  }
}
