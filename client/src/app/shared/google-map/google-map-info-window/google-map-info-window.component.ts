import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {removeTripMarkersAction, voteOnMarkerAction} from "../../../core/store/trips/trips.actions";
import {selectAllUsersList} from "../../../core/store/users";
import {VoteStatusModel} from "../../../core/interfaces/vote-status.model";
import {VotingStatusModel} from "../../../core/enums/voting-status.model";
import {selectTripMarkers} from "../../../core/store/trips";
import {Subscription} from "rxjs";
import {GooglePlacesTypesModel} from "../../../core/interfaces/google-places-types.model";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-google-map-info-window',
  templateUrl: './google-map-info-window.component.html',
  styleUrls: ['./google-map-info-window.component.scss']
})
export class GoogleMapInfoWindowComponent implements OnInit, OnChanges, OnDestroy {
  @Input() markerData;
  @Input() currentUser;
  @Input() tripData;
  @Input() currentMarkerId;
  @Input() currentMarkerVoteStatus;
  @Input() options;
  @Input() googleMap;
  @Output() onAddMarkerToTrip = new EventEmitter<any>();

  allUserListSubscription: Subscription;
  markerSubscription: Subscription;

  markerAddress: string;
  marker: any;
  allUserList: any[];
  updatedUserList: any[];
  userVoteStatus: VoteStatusModel;
  VotingStatusModel = VotingStatusModel;
  isVotingStarted: boolean = false;
  currentVotesCount: number = 0;
  totalVotesCount: number;
  hadUserVoted: boolean = false;
  hadMarkedVoteCompleteSuccessful: boolean = false;
  googlePlaceTypes = new GooglePlacesTypesModel();
  placeId: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setGooglePlaceData(changes['markerData']?.currentValue?.results)
    this.setUserList();
    this.handleUserVoting();
    this.checkIfUserVoted();
    this.handleTotalVotesCount();
    this.setIsMarkerAccepted();
  }

  ngOnDestroy() {
    this.allUserListSubscription.unsubscribe();
    if (this.markerSubscription) this.markerSubscription.unsubscribe();
  }

  removeMarker() {
    this.store.dispatch(removeTripMarkersAction({ id: this.tripData.id, currentUser: this.currentUser, markerId: this.currentMarkerId }))
  }

  toggleVoteOnMarker() {
    this.isVotingStarted = !this.isVotingStarted;
  }

  voteYesOnMarker() {
    this.store.dispatch(voteOnMarkerAction({ id: this.tripData.id, currentUser: this.currentUser, votingStatus: this.VotingStatusModel.confirmed}))
  }

  voteNoOnMarker() {
    this.store.dispatch(voteOnMarkerAction({ id: this.tripData.id, currentUser: this.currentUser, votingStatus: this.VotingStatusModel.declined}))
  }

  addMarkerToTrip() {
    this.markerSubscription = this.store.select(selectTripMarkers).subscribe((markers: any) => {
      markers.forEach(marker => {
        marker.markers.forEach(data => {
          this.marker = marker;
          if (data.label.id === this.currentMarkerId) {
            this.onAddMarkerToTrip.emit({markerId: data.label.id ,lng: data.position.lng, lat: data.position.lat})
          }
        })
      })
    })
  }

  private setUserList() {
    this.allUserListSubscription = this.store.select(selectAllUsersList).subscribe(userList => this.allUserList = userList);
    this.updatedUserList = Array.from(this.allUserList)

    this.allUserList.forEach(user => {
      if (user?._id === this.currentMarkerVoteStatus?.user?._id) {
        const index = this.updatedUserList.indexOf(user)
        this.updatedUserList[index] = {
          ...this.updatedUserList[index],
          markerVoteStatus: this.currentMarkerVoteStatus.status,
        }
      } else {
        const index = this.updatedUserList.indexOf(user)
        this.updatedUserList[index] = {
          ...this.updatedUserList[index],
          markerVoteStatus: VotingStatusModel.unvoted,
        }
      }
    })
  }

  private handleUserVoting() {
    this.updatedUserList.forEach(user => {
      user.usersTrips.forEach(data => {
        data.markers.forEach(marker => {
          marker.markers.forEach(userMarker => {
            userMarker.label.voteStatus.forEach(vote => {
              this.updatedUserList.forEach(us => {
                if (us.email === vote.user?.email) {
                  us.markerVoteStatus = vote.status;
                  us.voteCount = vote.votesCount
                }
              })
            })
          })
        })
      })
    })
  }

  private handleTotalVotesCount() {
    this.totalVotesCount = this.updatedUserList.length;
    const currentVotes = [];
    this.updatedUserList.forEach(user => {
      if (user.voteCount === 0) {
        currentVotes.push(1);
      }
      this.currentVotesCount = currentVotes.reduce((a,b) => a + b,0);
    })
  }

  private checkIfUserVoted() {
    this.updatedUserList.forEach(user => {
      if (user.email === this.currentUser.email) {
        if (user.voteCount === 0) {
          this.hadUserVoted = true;
        }
      }
    })
  }

  private setIsMarkerAccepted() {
    if (this.currentVotesCount/this.totalVotesCount === 1) {
      this.hadMarkedVoteCompleteSuccessful = true;
    }
  }

  private setGooglePlaceData(data: any) {
    this.markerData = data;
    if (this.markerData?.length) {
      this.markerData.filter(data => {
        data.types.map(type => {
          if ([this.googlePlaceTypes.street_address].includes(type)) {
            this.markerAddress = data.formatted_address;
          }
          if (
            [this.googlePlaceTypes.premise, this.googlePlaceTypes.subpremise, this.googlePlaceTypes.point_of_interest]
              .includes(type)
          ) {
            this.placeId = data.place_id;
          }
        })
      })
    }

    this.setGooglePlaceDetails();
  }

  private setGooglePlaceDetails() {
    if (!this.placeId) return;

    const map = new google.maps.Map(this.googleMap as HTMLElement)
    const request = {
      placeId: this.placeId,
      fields: ['name', 'address_component', 'type', 'formatted_address','icon', 'photos']
    };
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {

    });
  }
}
