import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {FormBuilder} from "@angular/forms";
import {UsersModel} from "../../../core/interfaces/users.model";
import {AuthService} from "../../../core/services/api/auth.service";
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Store} from "@ngrx/store";
import {addTripsUserAction} from "../../../core/store/trips/trips.actions";
import {selectPlansList} from "../../../core/store/users";


@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {
  tripUserForm = this.fb.group({
    user: ['']
  })

  allUsersList: any[] = []
  travelUser: UsersModel[] = []

  public model: any;

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.setAllUserList()
  }

  handleNextPage() {
    this.travelDataService.handleTravelUsersData(this.travelUser)
  }

  addUserToTrip(currentUser: UsersModel) {
    const updatedAllUserList = this.allUsersList.filter(user => user.email !== currentUser.email)
    this.allUsersList = updatedAllUserList

    this.travelUser.push(currentUser)
    this.store.dispatch(addTripsUserAction({ users: this.travelUser }))
    this.tripUserForm.get('user').patchValue('')
    this.tripUserForm.reset()
  }

  search: OperatorFunction<string, readonly {name: string, surname: string, photo: string }[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.allUsersList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.surname.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => '';

  private setAllUserList() {
    this.store.select(selectPlansList).subscribe(allUsersList => console.log(allUsersList))
    // this.authService.getAllUsersList()
    //   .subscribe(usersData => {
    //     const currentUser = this.localStorageService.getItem('user')
    //
    //     this.allUsersList = usersData
    //
    //     const updatedAllUserList = this.allUsersList.filter(users => users.email !== currentUser.email)
    //
    //     this.allUsersList = updatedAllUserList
    //   })
  }
}
