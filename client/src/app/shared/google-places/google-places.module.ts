import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GooglePlacesComponent} from "./google-places.component";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {SharedModule} from "../shared.module";



@NgModule({
  declarations: [GooglePlacesComponent],
  exports: [
    GooglePlacesComponent
  ],
    imports: [
        CommonModule,
        GooglePlaceModule,
        SharedModule
    ]
})
export class GooglePlacesModule { }
