import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setUserNewCar} from "../../../../core/store/users/users.actions";
import {CarModel} from "../../../../core/interfaces/car.model";
import {
  removeTripItemAction,
  setTripCarAction, setTripFuelCostAction, setTripItemAlreadyPaidAction,
  setTripItemsCostAction
} from "../../../../core/store/trips/trips.actions";
import {TripItemModel} from "../../../../core/interfaces/trip-item.model";
import {UUID} from "angular2-uuid";
import {selectUserCars} from "../../../../core/store/users";
import {UsersModel} from "../../../../core/interfaces/users.model";

@Component({
  selector: 'app-trip-cost-overview',
  templateUrl: './trip-cost-overview.component.html',
  styleUrls: ['./trip-cost-overview.component.scss'],
})
export class TripCostOverviewComponent implements OnInit, OnChanges {
  @Input() currentUser: any;
  @Input() userCars: CarModel[];
  @Input() totalTripDistance;
  @Input() currentTrip;
  @Input() tripItems: TripItemModel[];
  @Input() tripCar: CarModel;
  @Input() fuelCost: number;

  newCarForm: UntypedFormGroup;
  selectCarForm: UntypedFormGroup;
  newItemForm: UntypedFormGroup;
  currentItemForm: UntypedFormGroup;
  isAddCarFormVisible: boolean = false;
  isAddItemFormVisible: boolean = false;
  isCarChosen: boolean = false;
  isCurrentItemChosen: boolean = false;
  isCurrentItemCostIncurred: boolean = false;
  chosenCarFuelConsumption: number;
  petrolCost = 7.75;
  totalTripFuelCost: number;
  currentChosenItem: TripItemModel;
  currentChosenItemAlreadyPaid: number;
  tripItemsMuted: any[];
  currentItemTotalPaid: any;
  isValueExceedsCost: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userCars = changes['userCars']?.currentValue;
    this.tripItems = changes['tripItems']?.currentValue;
    this.totalTripDistance = changes['totalTripDistance']?.currentValue;
    if (changes['tripCar']?.currentValue && this.userCars) {
      this.userCars.map(car => {
        if (car.carName === changes['tripCar']?.currentValue.car) {
          this.chosenCarFuelConsumption = car.carFuelConsumption;
          this.calculateFuelTripCost();
        }
      });
      this.isCarChosen = true;
    }

    if (changes['fuelCost']?.currentValue) {
      this.totalTripFuelCost = changes['fuelCost']?.currentValue;
    }

    if (this.tripItems.length) {
      this.setTripItemsAlreadyPaid();
    }
  }

  ngOnInit(): void {
    this.createForms()
  }

  getPetrolCost() {

  }

  toggleAddNewItem(value: boolean) {
    this.isAddItemFormVisible = value;
  }

  toggleAddNewCar(value: boolean) {
    this.isAddCarFormVisible = value;
  }

  handleAddNewCar() {
    const carData = {
      carId: UUID.UUID(),
      carName: this.newCarForm.get('carName')?.value,
      carFuelConsumption: this.newCarForm.get('carFuelConsumption')?.value,
      user: this.currentUser
    }

    this.store.dispatch(setUserNewCar({ userCarData: carData }))
    this.isAddCarFormVisible = false;
    this.newCarForm.reset();
  }

  onSelectCar() {
    const chosenCar = this.selectCarForm.get('carName')?.value;
    this.userCars.map(car => {
      if (car.carName === chosenCar) {
        this.chosenCarFuelConsumption = car.carFuelConsumption;
        this.calculateFuelTripCost();
      }
    });
    this.store.dispatch(setTripCarAction({ id: this.currentTrip.id, currentUser: this.currentUser, car: chosenCar }))
    this.isCarChosen = true;
    this.selectCarForm.reset();
  }

  toggleIsCarChosen(value: boolean) {
    this.isCarChosen = value;
    this.store.select(selectUserCars).subscribe(cars => this.userCars = cars)
  }

  handleAddNewItem() {
    let alreadyPaidArr = [];

    const itemData = {
      itemId: UUID.UUID(),
      itemName: this.newItemForm.get('itemName')?.value,
      itemCost: this.newItemForm.get('itemCost')?.value,
      itemOwner: this.currentUser,
      itemDescription: this.newItemForm.get('itemDescription')?.value,
      alreadyPaid: alreadyPaidArr,
    }

    this.store.dispatch(setTripItemsCostAction({ id: this.currentTrip.id, currentUser: this.currentUser, item: itemData }))
    this.isAddItemFormVisible = false;
    this.newItemForm.reset();
  }

  removeTripItem() {
    const id = this.currentChosenItem.itemId;
    this.store.dispatch(removeTripItemAction({ id: this.currentTrip.id, currentUser: this.currentUser, itemId: id }))
    this.isCurrentItemChosen = false;
  }

  toggleChangeCurrentItem(value: boolean, currentItem?: TripItemModel | any) {
    this.isCurrentItemChosen = value;
    let totalAlreadyPaidArr = [];

    if (currentItem) {
      this.currentChosenItem = currentItem;
    }

    this.currentChosenItem.alreadyPaid.forEach(item => {
      totalAlreadyPaidArr.push(+item.amount)
      this.currentChosenItemAlreadyPaid = totalAlreadyPaidArr.reduce((a,b) => a + b);
    })

    if (currentItem?.totalPaid) {
      this.currentItemTotalPaid = currentItem?.totalPaid;
    }
  }

  handleChangeCurrentItem() {
    const alreadyPaid = this.currentItemForm.get('costPaid')?.value;
    let maxToPay;

    if (this.currentItemTotalPaid) {
      maxToPay = this.currentChosenItem.itemCost - this.currentItemTotalPaid
    } else {
      maxToPay = this.currentChosenItem.itemCost
    }

    if (alreadyPaid > maxToPay) {
      this.isValueExceedsCost = true;
    } else {
      this.isValueExceedsCost = false;
      this.store.dispatch(setTripItemAlreadyPaidAction({ id: this.currentTrip.id, currentUser: this.currentUser, alreadyPaid: {  tripId: this.currentChosenItem.itemId, user: this.currentUser, amount: alreadyPaid} }));
      this.isCurrentItemCostIncurred = false;
    }
  }

  handleAllCostPaid() {
    if (this.currentItemTotalPaid) {
      this.currentItemForm.patchValue({costPaid: this.currentChosenItem.itemCost - this.currentItemTotalPaid})
    } else {
      this.currentItemForm.patchValue({costPaid: this.currentChosenItem.itemCost})
    }
  }

  toggleCurrentItemCostIncurred(value: boolean) {
    this.isCurrentItemCostIncurred = value;
    this.isValueExceedsCost = false;
  }

  private createForms() {
    this.createNewCarForm();
    this.createSelectCarForm();
    this.createNewItemForm();
    this.createCurrentItemForm();
  }

  private createNewCarForm() {
    this.newCarForm = this.fb.group({
      carName: ['', [Validators.required]],
      carFuelConsumption: ['', [Validators.required]],
      carOwner: ['', [Validators.required]]
    })
  }

  private createSelectCarForm() {
    this.selectCarForm = this.fb.group({
      carName: ['', [Validators.required]],
    })
  }

  private calculateFuelTripCost() {
    this.totalTripFuelCost = Math.round((((this.totalTripDistance/100) * this.chosenCarFuelConsumption) * this.petrolCost) * 100) / 100;

    if (this.totalTripFuelCost) {
      this.store.dispatch(setTripFuelCostAction({ id: this.currentTrip.id, currentUser: this.currentUser, fuelCost: this.totalTripFuelCost}))
    }
  }

  private createNewItemForm() {
    this.newItemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemCost: ['', [Validators.required]],
      itemOwner: ['', [Validators.required]],
      itemDescription: ['', [Validators.required]]
    })
  }

  private createCurrentItemForm() {
    this.currentItemForm = this.fb.group({
      costPaid: ['', [Validators.required]],
    })
  }

  private setTripItemsAlreadyPaid() {
    let tripItemsMuted = Array.from(this.tripItems);
    let tripItemMutedCostArr = [];
    let finalArr = [];
    let output = [];

    if (tripItemsMuted.length) {
      tripItemsMuted.map(item => {
        item.alreadyPaid.forEach((paid:any) => {
          tripItemMutedCostArr.push({itemId: item.itemId, amount: +paid.amount});
        })
      })

      if (tripItemMutedCostArr.length) {
        tripItemMutedCostArr.forEach(function(item) {
          let existing = output.filter(function(v, i) {
            return v.itemId == item.itemId;
          });
          if (existing.length) {
            let existingIndex = output.indexOf(existing[0]);
            output[existingIndex].amount += +item.amount;
          } else {
            if (typeof item.value == 'string')
              item.value = item.value;
            output.push(item);
          }
        });
      }

      tripItemsMuted.map((trip: any) => {
        if (output.length) {
          output.map(data => {
            if (trip.itemId === data.itemId) {
              const newObj = Object.assign({totalPaid: data.amount}, trip);
              finalArr.push(newObj)
            } else {
              finalArr.push(trip)
            }
          })
        }
      })

      if (finalArr.length) {
        this.tripItemsMuted = finalArr;
      } else {
        this.tripItemsMuted = this.tripItems;
      }
    }
  }
}
