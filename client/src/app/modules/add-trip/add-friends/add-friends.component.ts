import { Component, OnInit } from '@angular/core';
import {TravelDataService} from "../../../core/services/travel-data.service";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {

  constructor(private travelDataService: TravelDataService) { }

  ngOnInit(): void {
  }

  handleNextPage() {
    this.travelDataService.handleTravelInfoData('sad')
  }

}
