import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './bars/top-bar/top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from "@angular/forms";
import { BottomBarComponent } from './bars/bottom-bar/bottom-bar.component';
import {RouterModule} from "@angular/router";
import { GoogleMapComponent } from './google-map/google-map.component';
import {GoogleMapModule} from "./google-map/google-map.module";
import { GooglePlacesComponent } from './google-places/google-places.component';
import {GooglePlacesModule} from "./google-places/google-places.module";
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    TopBarComponent,
    BottomBarComponent,
    ButtonComponent,
  ],
  exports: [
    TopBarComponent,
    BottomBarComponent,
    ButtonComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapModule,
  ]
})
export class SharedModule { }
