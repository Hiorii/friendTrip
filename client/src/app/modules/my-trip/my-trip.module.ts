import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTripComponent} from "./my-trip.component";
import {MyTripRoutingModule} from "./my-trip-routing.module";
import {GoogleMapModule} from "../../shared/google-map/google-map.module";
import {GooglePlacesModule} from "../../shared/google-places/google-places.module";

@NgModule({
  imports: [
    CommonModule,
    MyTripRoutingModule,
    GoogleMapModule,
    GooglePlacesModule
  ],
  declarations: [MyTripComponent],
})
export class MyTripModule { }
