import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTripComponent} from "./add-trip.component";
import {AddTripRoutingModule} from "./add-trip-routing.module";
import {GooglePlacesModule} from "../../shared/google-places/google-places.module";
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import {SharedModule} from "../../shared/shared.module";
import { NavigationComponent } from './navigation/navigation.component';
import { TravelSummarizeComponent } from './travel-summarize/travel-summarize.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AddTripRoutingModule,
    GooglePlacesModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AddTripComponent, AddFriendsComponent, TravelInfoComponent, NavigationComponent, TravelSummarizeComponent],
  exports: [
    AddTripComponent
  ],
})
export class AddTripModule { }
