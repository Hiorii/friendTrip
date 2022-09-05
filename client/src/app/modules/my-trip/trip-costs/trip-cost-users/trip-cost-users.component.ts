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
  leftToPay: boolean = false;
  isWhoToPay: boolean = false;
  currentTripCreator: UsersModel;
  currentUsersArr: UsersModel[] = [];
  userWithAmountToGiveBack = [];

  constructor() { }

  ngOnInit(): void {
    this.setCurrentTripUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTrip']?.currentValue) {
      this.tripUsers = this.currentTrip.tripUsers;
    }

    if (changes['currentTrip']?.currentValue) {
      this.tripItems = changes['tripItems']?.currentValue;
      this.setTotalTripPrice();
      this.calculateUsersCostDependency();
    }

    if (changes['fuelCost']?.currentValue) {
      this.fuelCost = changes['fuelCost']?.currentValue;
    }

    this.setCurrentTripUsers();
    //this.getPriceValueLeftToPayForUser();
  }

  // getPriceValueLeftToPayForUser() {
  //   const totalUserAmount = this.tripUsers.length + 1;
  //   let equalCost = this.tripTotalPriceMuted / totalUserAmount;
  //   let userFinalCost;
  //   let userFinalCostArr: {user: string, amount: number}[] = [];
  //
  //   if (this.tripItems?.length) {
  //     this.tripItems.map(item => {
  //       if (item.alreadyPaid.length) {
  //         item.alreadyPaid.forEach(paidItem => {
  //           if (paidItem.user === user.email) {
  //             // userFinalCost = equalCost - paidItem.amount;
  //             userFinalCostArr.push({ user: paidItem.user, amount: equalCost - paidItem.amount})
  //           } else {
  //             //userFinalCost = equalCost + (paidItem.amount/(totalUserAmount - 1));
  //             userFinalCostArr.push({ user: paidItem.user, amount: equalCost + (paidItem.amount/(totalUserAmount - 1))})
  //           }
  //         })
  //       }
  //     })
  //   }
  //
  //   if (!this.tripItems?.length) {
  //     userFinalCost = equalCost;
  //   }
  //
  //   return userFinalCost?.toFixed(2);
  // }

  getPriceValueLeftToPayForUser(user: UsersModel) {
    const totalUserAmount = this.tripUsers.length + 1;
    let equalCost = this.tripTotalPriceMuted / totalUserAmount;
    let userFinalCost;
    let userCostArr: {user: string, amount: number}[] = [];
    let userCostArrConverted: {user: string, amount: number}[] = [];
    let finalOutput = [];


    if (this.tripItems?.length) {
      this.tripItems.map(item => {
        if (item.alreadyPaid.length) {
          item.alreadyPaid.forEach(paidItem => {
            userCostArr.push({ user: paidItem.user, amount: paidItem.amount })
          })
        }
      })
    }

    if (userCostArr.length) {
      let userAmountArr = [];

      userCostArr.sort((a,b) => (a.user > b.user ? 1 : -1))
      userCostArr.forEach((el, index) => {
        if (userCostArr[index].user === userCostArr[index + 1]?.user) {
          userAmountArr.push(userCostArr[index], userCostArr[index + 1])
        }
      })

      userCostArrConverted = userCostArr.map(({amount, user}) => ({user, amount: +amount}));

      if (userCostArrConverted.length) {
        userCostArrConverted.forEach(function(item) {
          let existing = finalOutput.filter(function(v, i) {
            return v.user == item.user;
          });
          if (existing.length) {
            let existingIndex = finalOutput.indexOf(existing[0]);
            finalOutput[existingIndex].amount += item.amount;
          } else {
            if (typeof item.user == 'string')
              item.amount = item.amount;
            finalOutput.push(item);
          }
        });
      }
    }

    if (finalOutput.length) {
      const currentUser = finalOutput.filter(data => data.user === user.email)[0]
      let spentArr = [];
      let valueArr = [];
      let finalValue = 0;

      let localArr = finalOutput.filter(data => data.user !== user.email)
      localArr.forEach(data => {
        valueArr.push(data.amount / (finalOutput.length - 1))
        finalValue = (valueArr.reduce((a,b) => a + b))
      })

      spentArr.push({
        user: currentUser.user,
        amount: currentUser.amount,
        mountToPlus: (this.tripTotalPriceMuted/finalOutput.length) + (-currentUser.amount + finalValue)
      })

      this.userWithAmountToGiveBack.push(...spentArr);
    }

    if (this.userWithAmountToGiveBack.length) {
      this.userWithAmountToGiveBack.map(data => {
        if (data.user === user.email) {
          userFinalCost = data.mountToPlus;
        }
      })
    }

    if (!this.tripItems?.length) {
      userFinalCost = equalCost;
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
              userFinalCostArr.push(+paidItem.amount);
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

    if (!userFinalCost || userFinalCost === 0) {
      userFinalCost = 0;
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
      const newArr = [];

      alreadyPaidArr.map(i=> newArr.push(+i))
      const reducedCost = newArr.reduce((a,b) => a + b);
      this.tripTotalPriceMuted = this.tripTotalPriceMuted - reducedCost;
    }
  }

  private calculateUsersCostDependency() {
    const totalUserAmount = this.tripUsers.length + 1;

    if (this.tripItems.length) {

      this.tripItems.map(item => {
        if (item.alreadyPaid.length) {
          // item.alreadyPaid.forEach(paidItem => {
          //   if (paidItem.user === user.email) {
          //     userFinalCostArr.push(paidItem.amount);
          //   } else {
          //     userFinalCost = 0;
          //   }
          // })
        }
      })
    }
  }

  private setCurrentTripUsers() {
    let currentTripArr = [];

    this.currentTripCreator = this.currentTrip.creator;
    if (this.currentTrip.tripUsers.length) {
      this.currentTrip.tripUsers.map(user => {
        currentTripArr.push(user);
      })

      if (!this.currentTrip.tripUsers.includes(this.currentTripCreator)) {
        currentTripArr.push(this.currentTripCreator)
      }
    }

    this.currentUsersArr = currentTripArr;
  }
}
