import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {
  tripUserForm = this.fb.group({
    user: ['']
  })

  constructor(
    private travelDataService: TravelDataService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  handleNextPage() {
    const travelUser = {
      name: 'string',
      surname: 'string',
      email: 'string',
      creationDate: new Date(),
      isActive: true,
    }


    this.travelDataService.handleTravelUsersData(travelUser)
  }
}
