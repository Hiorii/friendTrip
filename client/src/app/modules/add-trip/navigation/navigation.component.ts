import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {AddTripNavigationModel} from "../../../core/enums/add-trip-navigation.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isTravelInfoNumber =  true
  isTravelPointDataNumber = false
  isAddUserNumber = false
  isTravelSummarize = false

  @Output() handlePageChange = new EventEmitter<number>()

  constructor(private travelDataService: TravelDataService) { }

  ngOnInit(): void {
    this.travelDataService.travelInfoData.subscribe(() => this.isTravelPointDataNumber = true)
    this.travelDataService.travelPointData.subscribe(() => this.isAddUserNumber = true)
  }

  handleChangePage(pageNumber: AddTripNavigationModel) {
    switch (pageNumber) {
      case AddTripNavigationModel.travelInfo :
        this.isTravelInfoNumber =  true
        this.isTravelPointDataNumber = false
        this.isAddUserNumber = false
        this.isTravelSummarize = false
        this.handlePageChange.emit(pageNumber)
        break;
      case AddTripNavigationModel.travelPoint :
        this.isTravelInfoNumber =  true
        this.isTravelPointDataNumber = true
        this.isAddUserNumber = false
        this.isTravelSummarize = false
        this.handlePageChange.emit(pageNumber)
        break;
      case AddTripNavigationModel.travelAddUser :
        this.isTravelInfoNumber =  true
        this.isTravelPointDataNumber = true
        this.isAddUserNumber = true
        this.isTravelSummarize = false
        this.handlePageChange.emit(pageNumber)
        break;
      case AddTripNavigationModel.travelSummarize :
        this.isTravelInfoNumber =  true
        this.isTravelPointDataNumber = true
        this.isAddUserNumber = true
        this.isTravelSummarize = true
        this.handlePageChange.emit(pageNumber)
        break;
      default:
        break;
    }
  }
}
