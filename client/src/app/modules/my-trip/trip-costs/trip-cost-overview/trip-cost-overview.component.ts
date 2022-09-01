import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validator, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setUserNewCar} from "../../../../core/store/users/users.actions";
import {CarModel} from "../../../../core/interfaces/car.model";

@Component({
  selector: 'app-trip-cost-overview',
  templateUrl: './trip-cost-overview.component.html',
  styleUrls: ['./trip-cost-overview.component.scss']
})
export class TripCostOverviewComponent implements OnInit, OnChanges {
  @Input() currentUser: any;
  @Input() userCars: CarModel[];
  @Input() totalTripDistance;

  costItems: { name: string, cost: number }[];
  newCarForm: UntypedFormGroup;
  selectCarForm: UntypedFormGroup;
  newItemForm: UntypedFormGroup;
  isAddCarFormVisible: boolean = false;
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
  }

  ngOnInit(): void {
    this.createForms()
  }

  getPetrolCost() {

  }

  toggleAddNewItem(value: boolean) {
    this.isAddCarFormVisible = value;
  }

  toggleAddNewCar(value: boolean) {
    this.isAddCarFormVisible = value;
  }

  handleAddNewItem() {
    const carData = {
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

  private createForms() {
    this.createNewCarForm();
    this.createSelectCarForm();
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
}
