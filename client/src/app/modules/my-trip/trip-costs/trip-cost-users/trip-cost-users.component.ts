import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TripModel} from "../../../../core/interfaces/trip.model";
import {UsersModel} from "../../../../core/interfaces/users.model";
import {TripItemModel} from "../../../../core/interfaces/trip-item.model";

@Component({
  selector: 'app-trip-cost-users',
  templateUrl: './trip-cost-users.component.html',
  styleUrls: ['./trip-cost-users.component.scss']
})
export class TripCostUsersComponent implements OnInit, OnChanges {
  @Input() currentTrip: TripModel
  @Input() currentUser: UsersModel
  @Input() tripItems: TripItemModel[];
  @Input() fuelCost: number;
  tripUsers: UsersModel[];
  tripTotalPrice: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTrip']?.currentValue) {
      this.tripUsers = this.currentTrip.tripUsers;
    }

    if (changes['currentTrip']?.currentValue) {
      this.tripItems = changes['tripItems']?.currentValue;
      this.setTotalTripPrice();
    }

    this.fuelCost = changes['fuelCost']?.currentValue;
  }

  private setTotalTripPrice() {
    let costArr = [];
    let totalArrPrice: number;

    this.tripItems.forEach(item => {
      costArr.push(item.itemCost);
    } )

    if (costArr.length) {
      const convertedArr = costArr.map(function(item) {
        return parseInt(item, 10);
      });

      totalArrPrice = convertedArr.reduce((a,b) => a + b);

      this.tripTotalPrice = this.fuelCost ? totalArrPrice + this.fuelCost : totalArrPrice;
    }
  }

  getPriceValueForUser(user: UsersModel) {
    const totalUserAmount = this.tripUsers.length + 1;

    const equalCost = this.tripTotalPrice / 3

    return equalCost.toFixed(2);
  }
}
