import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyTripComponent} from "./my-trip.component";
import {TripComponent} from "./trip/trip.component";

const routes: Routes = [
  {
    path: 'my-trips',
    component: MyTripComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-trips/:id',
    component: TripComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MyTripRoutingModule {}
