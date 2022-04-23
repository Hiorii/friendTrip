import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./modules/auth/auth.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./modules/auth/auth.guard";
import {MainComponent} from "./modules/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
