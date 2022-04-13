import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTripComponent} from "./add-trip.component";
import {AddTripRoutingModule} from "./add-trip-routing.module";
import {GooglePlacesModule} from "../../shared/google-places/google-places.module";

@NgModule({
    imports: [
        CommonModule,
        AddTripRoutingModule,
        GooglePlacesModule
    ],
  declarations: [AddTripComponent],
  exports: [
    AddTripComponent
  ],
})
export class AddTripModule { }
