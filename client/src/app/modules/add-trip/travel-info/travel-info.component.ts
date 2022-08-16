import {Component, Input, OnInit, Output} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {TripInfoDataModel} from "../../../core/interfaces/trip-info-data.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Store} from "@ngrx/store";
import {setTripInfoAction} from "../../../core/store/trips/trips.actions";
import {selectTripInfo} from "../../../core/store/trips";

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss']
})
export class TravelInfoComponent implements OnInit {
  @Input() tripInfoData: TripInfoDataModel

  travelInfo: TripInfoDataModel
  travelInfoForm = this.fb.group({
    travelName: ['', [Validators.required, Validators.minLength(3)]],
    travelPlannedTotalCost: ['', [Validators.pattern("^[0-9]*$")]],
    travelPhoto: [''],
  })

  constructor(
    private travelDataService: TravelDataService,
    private fb: UntypedFormBuilder,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.setCurrentTripInfo()
    this.saveTripInfoData()
  }

  handleNextPage() {
    const travelInfoData: TripInfoDataModel = {
      travelName: this.travelInfoForm.get('travelName').value,
      travelPlannedTotalCost: this.travelInfoForm.get('travelPlannedTotalCost').value,
      travelPhoto: this.travelInfoForm.get('travelPhoto').value,
    }

    this.store.dispatch(setTripInfoAction({ tripInfo: travelInfoData}))

    this.travelDataService.handleTravelInfoData(this.travelInfo)
  }

  fileBrowseHandler(file: any) {

  }

  private setCurrentTripInfo() {
    this.travelInfo = this.tripInfoData

    if(this.travelInfo) {
      this.travelInfoForm.get('travelName').setValue(this.travelInfo.travelName),
      this.travelInfoForm.get('travelPlannedTotalCost').setValue(this.travelInfo.travelPlannedTotalCost),
      this.travelInfoForm.get('travelPhoto').setValue(this.travelInfo.travelPhoto)
    }
  }

  private saveTripInfoData() {
    this.travelInfoForm.get('travelName').valueChanges
      .subscribe(val => this.travelInfo.travelName = val),

    this.travelInfoForm.get('travelPlannedTotalCost').valueChanges
      .subscribe(val => this.travelInfo.travelPlannedTotalCost = val),

    this.travelInfoForm.get('travelPhoto').valueChanges
      .subscribe(val => this.travelInfo.travelPhoto = val)
  }
}
