import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTripComponent} from "./my-trip.component";
import {MyTripRoutingModule} from "./my-trip-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MyTripRoutingModule
  ],
  declarations: [MyTripComponent],
})
export class MyTripModule { }
