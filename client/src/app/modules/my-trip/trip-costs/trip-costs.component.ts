import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUserCars} from "../../../core/store/users";

@Component({
  selector: 'app-trip-costs',
  templateUrl: './trip-costs.component.html',
  styleUrls: ['./trip-costs.component.scss']
})
export class TripCostsComponent implements OnInit, OnChanges {
  @Input() currentUser;
  @Input() totalTripDistance;
  userCars$ = this.store.select(selectUserCars);

  constructor(private store: Store) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalTripDistance = changes['totalTripDistance']?.currentValue;
  }

  ngOnInit(): void {
  }

}
