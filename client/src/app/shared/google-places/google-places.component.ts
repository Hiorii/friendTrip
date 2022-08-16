import {Component, Input, OnInit} from '@angular/core';
import {TripPointsModel} from "../../core/interfaces/trip-points.model";
import {TravelDataService} from "../../core/services/travel-data.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {Store} from "@ngrx/store";
import {setTripPointsAction} from "../../core/store/trips/trips.actions";

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  @Input() tripPointData: TripPointDataModel

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
    private fb: UntypedFormBuilder,
    private store: Store
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

    this.store.dispatch(setTripPointsAction({ tripPoints: travelDataPoints }))

    this.travelDataService.handleTravelPointData(travelDataPoints)
  }

  private setCurrentTripPoints() {
    this.tripPoints = this.tripPointData

    this.tripPlacesForm.get('startPoint').setValue(this.tripPoints?.startPoint?.address),
    this.tripPlacesForm.get('destinationPoint').setValue(this.tripPoints?.destinationPoint?.address)
  }
}
