import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [

    ]
  }
]

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
