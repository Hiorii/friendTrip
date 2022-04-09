import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ToDoComponent} from "./to-do.component";

const routes: Routes = [
  {
    path: 'to-do',
    component: ToDoComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ToDoRoutingModule {}
