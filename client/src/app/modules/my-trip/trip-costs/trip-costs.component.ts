import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCurrentUser, selectUserCars} from "../../../core/store/users";
import {selectTripCar, selectTripFuelCost, selectTripItems} from "../../../core/store/trips";

@Component({
  selector: 'app-trip-costs',
  templateUrl: './trip-costs.component.html',
  styleUrls: ['./trip-costs.component.scss']
})
export class TripCostsComponent implements OnInit, OnChanges {
  @Input() currentUser;
  @Input() totalTripDistance;
  @Input() currentTrip;
  userCars$ = this.store.select(selectUserCars);
  tripItems$ = this.store.select(selectTripItems);
  user$ = this.store.select(selectCurrentUser);
  tripCar$ = this.store.select(selectTripCar);
  fuelCost$ = this.store.select(selectTripFuelCost);
  isUserCostVisible: boolean = true;

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalTripDistance = changes['totalTripDistance']?.currentValue;
  }

  ngOnInit(): void {
  }

  toggleUserCosts() {
    this.isUserCostVisible = !this.isUserCostVisible;
  }
}
