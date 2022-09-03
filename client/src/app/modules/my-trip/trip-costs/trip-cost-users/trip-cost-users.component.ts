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
  tripTotalPriceMuted: number;
  isAnyCostAdded: boolean = false;
  leftToPay: boolean = true;

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

    if (changes['fuelCost']?.currentValue) {
      this.fuelCost = changes['fuelCost']?.currentValue;
    }
    console.log(this.fuelCost)
  }



  getPriceValueLeftToPayForUser(user: UsersModel) {
    const totalUserAmount = this.tripUsers.length + 1;
    let equalCost = this.tripTotalPriceMuted / totalUserAmount;
    let userFinalCost;

    if (this.tripItems.length) {
      this.tripItems.map(item => {
        if (item.alreadyPaid.length) {
          item.alreadyPaid.forEach(paidItem => {
            if (paidItem.user === user.email) {
              userFinalCost = equalCost - paidItem.amount;
            } else {
              userFinalCost = equalCost;
            }
          })
        }
      })
    }

    return userFinalCost?.toFixed(2);
  }

  getPriceValueAlreadyPaidForUser(user: UsersModel) {
    let userFinalCost;
    let userFinalCostArr = [];

    if (this.tripItems.length) {
      this.tripItems.map(item => {
        if (item.alreadyPaid.length) {
          item.alreadyPaid.forEach(paidItem => {
            if (paidItem.user === user.email) {
              userFinalCostArr.push(paidItem.amount);
            } else {
              userFinalCost = 0;
            }
          })
        }
      })
    }

    if (userFinalCostArr.length > 0) {
      userFinalCost = parseInt(userFinalCostArr.reduce((a,b) => a + b), 10);
    }

    return userFinalCost?.toFixed(2);
  }

  togglePayMethod() {
    this.leftToPay = !this.leftToPay;
  }

  private setTotalTripPrice() {
    let costArr = [];
    let alreadyPaidArr = [];
    let totalArrPrice: number;

    this.tripItems.forEach(item => {
      costArr.push(item.itemCost);
    } )

    if (costArr.length) {
      const convertedArr = costArr.map(function(item) {
        return parseInt(item, 10);
      });

      totalArrPrice = convertedArr.reduce((a,b) => a + b);

      this.isAnyCostAdded = true;
      this.tripTotalPrice = this.fuelCost ? totalArrPrice + this.fuelCost : totalArrPrice;
      this.tripTotalPriceMuted = this.tripTotalPrice;
    }

    if (!costArr.length && this.fuelCost) {
      this.isAnyCostAdded = true;
      this.tripTotalPrice = this.fuelCost;
      this.tripTotalPriceMuted = this.tripTotalPrice;
    }

    if (!costArr.length && !this.fuelCost) {
      this.isAnyCostAdded = false;
    }

    if (this.tripItems.length) {
      this.tripItems.map(item => {
        if (item.alreadyPaid.length) {
          item.alreadyPaid.forEach(paidItem => {
            alreadyPaidArr.push(paidItem.amount)
          })
        }
      })
    }

    if (alreadyPaidArr.length > 0) {
      const reducedCost = parseInt(alreadyPaidArr.reduce((a,b) => a + b), 10);
      this.tripTotalPriceMuted = this.tripTotalPriceMuted - reducedCost;
    }
  }
}
