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

@NgModule({
    imports: [
        CommonModule,
        MyTripRoutingModule,
        GoogleMapModule,
        GooglePlacesModule,
        ChatModule,
        SharedModule,
        CoreModule
    ],
  declarations: [MyTripComponent, TripComponent, TripListComponent, WaypointsComponent, WaypointComponent, TripDurationDistanceComponent],
})
export class MyTripModule { }
