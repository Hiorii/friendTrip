import {RouterModule, Routes} from "@angular/router";
import {JournalComponent} from "./journal.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: 'journal',
    component: JournalComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {}
