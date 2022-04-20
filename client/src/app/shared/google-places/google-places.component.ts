import {Component, OnInit} from '@angular/core';
import {TripPointsModel} from "../../core/interfaces/trip-points.model";
import {TravelDataService} from "../../core/services/travel-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  tripPlacesForm = this.fb.group({
    startPoint: ['', [Validators.required]],
    destinationPoint: ['', [Validators.required]]
  })

  startPoint: TripPointsModel = {
    address: '',
    latitude: '',
    longitude: ''
  }
  destinationPoint: TripPointsModel = {
    address: '',
    latitude: '',
    longitude: ''
  }

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder
  ) { }

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
    const travelDataPoints = {
      startPoint: this.startPoint,
      destinationPoint: this.destinationPoint
    }

    this.travelDataService.handleTravelPointData(travelDataPoints)
  }
}
