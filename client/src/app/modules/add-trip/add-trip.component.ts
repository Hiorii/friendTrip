import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../core/services/travel-data.service";
import {TripPointDataModel} from "../../core/interfaces/trip-point-data.model";
import {AddTripNavigationModel} from "../../core/enums/add-trip-navigation.model";
import {TripInfoDataModel} from "../../core/interfaces/trip-info-data.model";
import {UsersModel} from "../../core/interfaces/users.model";
import {Store} from "@ngrx/store";
import {selectAllUsersList, selectCurrentUser} from "../../core/store/users";
import {selectTripInfo, selectTripPoints, selectTripUsers} from "../../core/store/trips";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  isTravelInfo =  true
  isTravelPointData = false
  isAddUser = false
  isTravelSummarize = false
  travelInfoData: TripInfoDataModel
  travelPointData: TripPointDataModel
  travelUsersData: UsersModel[]

  //users Data
  allUsersList$ = this.store.select(selectAllUsersList)
  currentUser$ = this.store.select(selectCurrentUser)

  //trip Data
  tripInfo$ = this.store.select(selectTripInfo)
  tripPoints$ = this.store.select(selectTripPoints)
  tripUsers$ = this.store.select(selectTripUsers)

  constructor(
    private travelDataService: TravelDataService,
    private store: Store
) { }

  ngOnInit(): void {
    this.travelDataService.travelInfoData.subscribe(data => {
      this.travelInfoData = data
      this.isTravelInfo = false
      this.isTravelPointData = true
    })

    this.travelDataService.travelPointData.subscribe(data => {
      this.travelPointData = data
      this.isTravelPointData = false
      this.isAddUser = true
    })

    this.travelDataService.travelUsers.subscribe(data => {
      this.travelUsersData = data
      this.isAddUser = false
      this.isTravelSummarize = true
    })
  }

  onNumberChange(pageNumber: AddTripNavigationModel) {
    switch (pageNumber) {
      case AddTripNavigationModel.travelInfo :
        this.isTravelInfo =  true
        this.isTravelPointData = false
        this.isAddUser = false
        this.isTravelSummarize = false
        break;
      case AddTripNavigationModel.travelPoint :
        this.isTravelInfo =  false
        this.isTravelPointData = true
        this.isAddUser = false
        this.isTravelSummarize = false
        break;
      case AddTripNavigationModel.travelAddUser :
        this.isTravelInfo =  false
        this.isTravelPointData = false
        this.isAddUser = true
        this.isTravelSummarize = false
        break;
      case AddTripNavigationModel.travelSummarize :
        this.isTravelInfo =  false
        this.isTravelPointData = false
        this.isAddUser = false
        this.isTravelSummarize = true
        break;
      default:
        break;
    }
  }
}
