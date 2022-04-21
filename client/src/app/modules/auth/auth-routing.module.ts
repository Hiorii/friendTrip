import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  }
]

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
