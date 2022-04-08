import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./modules/auth/auth.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
