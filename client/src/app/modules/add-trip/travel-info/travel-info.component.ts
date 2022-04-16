import {Component, OnInit, Output} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss']
})
export class TravelInfoComponent implements OnInit {
  travelInfoForm = this.fb.group({
    travelName: ['', Validators.required],
    travelPlannedTotalCost: [''],
    travelPhoto: [''],
  })

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  handleNextPage() {
    const travelInfo = {
      travelName: this.travelInfoForm.get('travelName').value,
      travelPlannedTotalCost: this.travelInfoForm.get('travelPlannedTotalCost').value,
      travelPhoto: this.travelInfoForm.get('travelPhoto').value,
    }
    this.travelDataService.handleTravelInfoData(travelInfo)
  }

  fileBrowseHandler(file: any) {

  }
}
