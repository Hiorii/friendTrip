import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapComponent} from "./google-map.component";
import {GoogleMapsModule} from "@angular/google-maps";
import {GoogleMapInfoWindowComponent} from "./google-map-info-window/google-map-info-window.component";

@NgModule({
  declarations: [
    GoogleMapComponent,
    GoogleMapInfoWindowComponent
  ],
  exports: [
    GoogleMapComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ]
})
export class GoogleMapModule { }
