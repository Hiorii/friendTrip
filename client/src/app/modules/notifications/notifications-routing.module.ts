import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationsComponent} from "./notifications.component";

const routes: Routes = [
  {
    path: 'notifications',
    component: NotificationsComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
