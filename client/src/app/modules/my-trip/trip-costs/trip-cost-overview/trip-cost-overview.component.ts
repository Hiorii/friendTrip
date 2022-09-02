import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setUserNewCar} from "../../../../core/store/users/users.actions";
import {CarModel} from "../../../../core/interfaces/car.model";
import {removeTripItemAction, setTripItemsCostAction} from "../../../../core/store/trips/trips.actions";
import {TripItemModel} from "../../../../core/interfaces/trip-item.model";
import {UUID} from "angular2-uuid";
import {selectTripItems} from "../../../../core/store/trips";

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

  newCarForm: UntypedFormGroup;
  selectCarForm: UntypedFormGroup;
  newItemForm: UntypedFormGroup;
  isAddCarFormVisible: boolean = false;
  isAddItemFormVisible: boolean = false;
  isCarChosen: boolean = false;
  chosenCarFuelConsumption: number;
  petrolCost = 7.75;
  totalTripFuelCost: number;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userCars = changes['userCars']?.currentValue;
    this.tripItems = changes['tripItems']?.currentValue;
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
  }

  onSelectCar() {
    const chosenCar = this.selectCarForm.get('carName')?.value;
    this.userCars.map(car => {
      if (car.carName === chosenCar) {
        this.chosenCarFuelConsumption = car.carFuelConsumption;
        this.calculateFuelTripCost();
      }
    });

    this.isCarChosen = true;
  }

  toggleIsCarChosen(value: boolean) {
    this.isCarChosen = value;
  }

  handleAddNewItem() {
    const itemData = {
      itemId: UUID.UUID(),
      itemName: this.newItemForm.get('itemName')?.value,
      itemCost: this.newItemForm.get('itemCost')?.value,
      itemOwner: this.currentUser,
      itemDescription: this.newItemForm.get('itemDescription')?.value,
    }

    this.store.dispatch(setTripItemsCostAction({ id: this.currentTrip.id, currentUser: this.currentUser, item: itemData }))
    this.isAddItemFormVisible = false;
  }

  removeTripItem(id: string) {
    this.store.dispatch(removeTripItemAction({ id: this.currentTrip.id, currentUser: this.currentUser, itemId: id }))
  }

  private createForms() {
    this.createNewCarForm();
    this.createSelectCarForm();
    this.createNewItemForm();
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
    this.totalTripFuelCost = ((this.totalTripDistance/100) * this.chosenCarFuelConsumption) * this.petrolCost;
  }

  private createNewItemForm() {
    this.newItemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemCost: ['', [Validators.required]],
      itemOwner: ['', [Validators.required]],
      itemDescription: ['', [Validators.required]]
    })
  }
}