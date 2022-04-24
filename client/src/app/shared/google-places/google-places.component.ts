import {Component, OnInit} from '@angular/core';
import {TripPointsModel} from "../../core/interfaces/trip-points.model";
import {TravelDataService} from "../../core/services/travel-data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";
import {LocalStorageService} from "../../core/services/local-storage.service";

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  tripPoints: TripPointDataModel
  tripPlacesForm = this.fb.group({
    startPoint: ['', [Validators.required]],
    destinationPoint: ['', [Validators.required]]
  })

  startPoint: TripPointsModel = {
    address: '',
    latitude: 0,
    longitude: 0
  }
  destinationPoint: TripPointsModel = {
    address: '',
    latitude: 0,
    longitude: 0
  }

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.setCurrentTripPoints()
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

    this.localStorageService.setItem('tripPoints', travelDataPoints)

    this.travelDataService.handleTravelPointData(travelDataPoints)
  }

  private setCurrentTripPoints() {
    this.tripPoints = this.localStorageService.getItem('tripPoints') || {}

    this.tripPlacesForm.get('startPoint').setValue(this.tripPoints?.startPoint?.address),
    this.tripPlacesForm.get('destinationPoint').setValue(this.tripPoints?.destinationPoint?.address)
  }
}
