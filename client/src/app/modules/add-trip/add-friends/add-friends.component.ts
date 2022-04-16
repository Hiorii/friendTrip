import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {UsersModel} from "../../../core/interfaces/users.model";
import {AuthService} from "../../../core/services/auth.service";
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {
  allUsersList: any[] = []
  travelUser: UsersModel[] = []

  public model: any;

  constructor(
    private travelDataService: TravelDataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getAllUsersList()
      .subscribe(usersData => this.allUsersList = usersData)
  }

  handleNextPage() {
    //this.travelDataService.handleTravelInfoData('sad')
  }

  search: OperatorFunction<string, readonly {name: string, surname: string, photo: string }[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.allUsersList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.surname.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;
}
