import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AddTripComponent} from "./add-trip.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: 'add-trip',
    component: AddTripComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AddTripRoutingModule { }
