import {RouterModule, Routes} from "@angular/router";
import {HighlightsComponent} from "./highlights.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: 'highlights',
    component: HighlightsComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HighlightsRoutingModule {}
