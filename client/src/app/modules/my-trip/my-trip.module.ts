import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTripComponent} from "./my-trip.component";
import {MyTripRoutingModule} from "./my-trip-routing.module";
import {GoogleMapModule} from "../../shared/google-map/google-map.module";
import {GooglePlacesModule} from "../../shared/google-places/google-places.module";
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import {ChatModule} from "../../shared/chat/chat.module";
import {SharedModule} from "../../shared/shared.module";
import { WaypointsComponent } from './waypoints/waypoints.component';
import { WaypointComponent } from './waypoints/waypoint/waypoint.component';
import {CoreModule} from "../../core/core.module";
import { TripDurationDistanceComponent } from './trip-duration-distance/trip-duration-distance.component';
import { TripCostsComponent } from './trip-costs/trip-costs.component';
import { TripCostOverviewComponent } from './trip-costs/trip-cost-overview/trip-cost-overview.component';
import { TripCostUsersComponent } from './trip-costs/trip-cost-users/trip-cost-users.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MyTripRoutingModule,
    GoogleMapModule,
    GooglePlacesModule,
    ChatModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [MyTripComponent, TripComponent, TripListComponent, WaypointsComponent, WaypointComponent, TripDurationDistanceComponent, TripCostsComponent, TripCostOverviewComponent, TripCostUsersComponent],
})
export class MyTripModule { }
