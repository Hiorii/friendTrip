import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
<<<<<<< HEAD
import {FormBuilder} from "@angular/forms";
=======
import {UsersModel} from "../../../core/interfaces/users.model";
import {AuthService} from "../../../core/services/auth.service";
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {
<<<<<<< HEAD
  tripUserForm = this.fb.group({
    user: ['']
  })

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder
    ) { }
=======
  allUsersList: any[] = []
  travelUser: UsersModel[] = []

  public model: any;

  constructor(
    private travelDataService: TravelDataService,
    private authService: AuthService
  ) { }
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8

  ngOnInit(): void {
    this.authService.getAllUsersList()
      .subscribe(usersData => this.allUsersList = usersData)
  }

  handleNextPage() {
<<<<<<< HEAD
    const travelUser = {
      name: 'string',
      surname: 'string',
      email: 'string',
      creationDate: new Date(),
      isActive: true,
    }


    this.travelDataService.handleTravelUsersData(travelUser)
  }
=======
    //this.travelDataService.handleTravelInfoData('sad')
  }

  search: OperatorFunction<string, readonly {name: string, surname: string, photo: string }[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.allUsersList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.surname.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;
>>>>>>> 70f97389b797708af64ab454d5651d544c9e11f8
}
