import {Component, OnInit, Output} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {TripInfoDataModel} from "../../../core/interfaces/trip-info-data.model";

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss']
})
export class TravelInfoComponent implements OnInit {
  travelInfoForm = this.fb.group({
    travelName: ['', [Validators.required, Validators.minLength(3)]],
    travelPlannedTotalCost: ['', [Validators.pattern("^[0-9]*$")]],
    travelPhoto: [''],
  })

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  handleNextPage() {
<<<<<<< HEAD
    const travelInfoData: TripInfoDataModel = {
=======
    const travelInfo = {
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8
      travelName: this.travelInfoForm.get('travelName').value,
      travelPlannedTotalCost: this.travelInfoForm.get('travelPlannedTotalCost').value,
      travelPhoto: this.travelInfoForm.get('travelPhoto').value,
    }
<<<<<<< HEAD

    this.travelDataService.handleTravelInfoData(travelInfoData)
=======
    this.travelDataService.handleTravelInfoData(travelInfo)
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8
  }

  fileBrowseHandler(file: any) {

  }
}
