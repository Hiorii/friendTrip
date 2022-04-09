import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightsComponent} from "./highlights.component";
import {HighlightsRoutingModule} from "./highlights-routing.module";

@NgModule({
  imports: [
    CommonModule,
    HighlightsRoutingModule
  ],
  declarations: [HighlightsComponent],
})
export class HighlightsModule { }
