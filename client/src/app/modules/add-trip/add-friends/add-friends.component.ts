import {Component, Input, OnInit} from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {FormBuilder} from "@angular/forms";
import {UsersModel} from "../../../core/interfaces/users.model";
import {AuthService} from "../../../core/services/api/auth.service";
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Store} from "@ngrx/store";
import {setTripUsersAction} from "../../../core/store/trips/trips.actions";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {
  @Input() allUsersList: UsersModel[]
  @Input() tripUsersData: UsersModel[]

  allUsers: any[] = []
  tripUsers: UsersModel[] = []

  tripUserForm = this.fb.group({
    user: ['']
  })

  public model: any;

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.setAllUserList()
    this.setTripUsersList()
  }

  handleNextPage() {
    this.travelDataService.handleTravelUsersData(this.tripUsers)
  }

  addUserToTrip(currentUser: UsersModel) {
    const currentlyAddedUsers = Array.from(this.tripUsers)
    currentlyAddedUsers.push(currentUser)

    this.store.dispatch(setTripUsersAction({ tripUsers: currentlyAddedUsers }))
    this.tripUsers = currentlyAddedUsers

    //remove added user from allUsers
    const updatedAllUsers = this.allUsers.filter(users => !this.tripUsers.includes(users))
    this.allUsers = updatedAllUsers

    //reset form
    this.tripUserForm.get('user').patchValue('')
    this.tripUserForm.reset()
  }

  search: OperatorFunction<string, readonly {name: string, surname: string, photo: string }[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.allUsers.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.surname.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => '';

  private setAllUserList() {
    this.allUsers = this.allUsersList

    const currentUser = this.localStorageService.getItem('user')
    const updatedAllUserList = this.allUsers.filter(users => users.email !== currentUser.email)

    this.allUsers = updatedAllUserList
  }

  private setTripUsersList() {
    if (this.tripUsersData.length) {
      this.tripUsers = this.tripUsersData
    } else {
      this.tripUsers = []
    }
  }
}
