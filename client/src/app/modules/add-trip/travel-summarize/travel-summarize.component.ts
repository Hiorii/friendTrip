import {Component, Input, OnInit} from '@angular/core';

import {TripModel} from "../../../core/interfaces/trip.model";

import {UsersModel} from "../../../core/interfaces/users.model";
import {TripInfoDataModel} from "../../../core/interfaces/trip-info-data.model";
import {TripPointDataModel} from "../../../core/interfaces/trip-point-data.model";
import {TripApiService} from "../../../core/services/api/trip-api.service";
import {Store} from "@ngrx/store";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/api/auth.service";
import {UUID} from "angular2-uuid";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {tap} from "rxjs";
import {ToastService} from "../../../shared/toast/toast.service";

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
  tripMessages: [] = [];

  constructor(
    private tripApiService: TripApiService,
    private store: Store,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const tripData = {
      id: UUID.UUID(),
      travelInfoData: this.tripInfoData,
      travelPoints: this.tripPointData,
      tripUsers: this.tripUsersData,
      messages: this.tripMessages,
    }

   this.tripData = tripData
  }

  createTrip() {
    const currentUser = this.localStorageService.getItem('user')

    const user = this.authService.getCurrentUser(currentUser.email)
      .subscribe(user => console.log(user))

    this.dialogService.openConfirmationDialog({
      title: 'Add new trip',
      desc: 'Are you sure you want to add new trip?'
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.tripApiService.addNewTrip(currentUser, this.tripData)
            .subscribe((newTripData: any) => {
              // this.store.dispatch(setTripDataAction({trip: newTripData}))
              //
              this.router.navigate(['my-trips'])
              this.toastService.success('New trip successfully added')
            })

          if (this.tripData.tripUsers.length > 0) {
            this.tripData.tripUsers.forEach(user => {
              this.tripApiService.addNewTrip(user, this.tripData)
                .subscribe((newTripData: any) => {
                  // this.store.dispatch(setTripDataAction({trip: newTripData}))
                  //
                  //this.router.navigate(['my-trips'])
                })
            })
          }
        }
      })
  }
}
