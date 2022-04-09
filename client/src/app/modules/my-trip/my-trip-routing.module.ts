import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyTripComponent} from "./my-trip.component";

const routes: Routes = [
  {
    path: 'my-trips',
    component: MyTripComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MyTripRoutingModule {}
