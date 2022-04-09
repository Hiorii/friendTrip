import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AddTripComponent} from "./add-trip.component";

const routes: Routes = [
  {
    path: 'add-trip',
    component: AddTripComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AddTripRoutingModule { }
