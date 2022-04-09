import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTripComponent} from "./add-trip.component";
import {AddTripRoutingModule} from "./add-trip-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AddTripRoutingModule
  ],
  declarations: [AddTripComponent],
  exports: [
    AddTripComponent
  ],
})
export class AddTripModule { }
