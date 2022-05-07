import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTripComponent} from "./my-trip.component";
import {MyTripRoutingModule} from "./my-trip-routing.module";
import {GoogleMapModule} from "../../shared/google-map/google-map.module";
import {GooglePlacesModule} from "../../shared/google-places/google-places.module";
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
  imports: [
    CommonModule,
    MyTripRoutingModule,
    GoogleMapModule,
    GooglePlacesModule
  ],
  declarations: [MyTripComponent, TripComponent, TripListComponent],
})
export class MyTripModule { }
