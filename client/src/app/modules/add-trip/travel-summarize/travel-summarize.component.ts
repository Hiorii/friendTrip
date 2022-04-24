import {Component, Input, OnInit} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {TripModel} from "../../../core/interfaces/trip.model";
import {TripPointsModel} from "../../../core/interfaces/trip-points.model";
import {UsersModel} from "../../../core/interfaces/users.model";
import {TripInfoDataModel} from "../../../core/interfaces/trip-info-data.model";
import {TripPointDataModel} from "../../../core/interfaces/trip-point-data.model";
import {TripApiService} from "../../../core/services/api/trip-api.service";
import {Store} from "@ngrx/store";
import {setTripDataAction} from "../../../core/store/trips/trips.actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-travel-summarize',
  templateUrl: './travel-summarize.component.html',
  styleUrls: ['./travel-summarize.component.scss']
})
export class TravelSummarizeComponent implements OnInit {
  @Input() tripInfoData: TripInfoDataModel
  @Input() tripPointData: TripPointDataModel
  @Input() tripUsersData: UsersModel[]

  tripData: TripModel

  constructor(
    private tripApiService: TripApiService,
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const tripData = {
      travelInfoData: this.tripInfoData,
      travelPoints: this.tripPointData,
      tripUsers: this.tripUsersData
    }

   this.tripData = tripData
  }

  createTrip() {
    this.tripApiService.addNewTrip(this.tripData)
      .subscribe((newTripData: any) => {
        this.store.dispatch(setTripDataAction({trip: newTripData}))

        this.router.navigate(['my-trips'])
      })

    this.localStorageService.removeItem('tripPoints')
    this.localStorageService.removeItem('tripInfo')
    this.localStorageService.removeItem('tripUsers')
  }
}
