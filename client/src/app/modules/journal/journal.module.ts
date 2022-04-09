import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JournalComponent} from "./journal.component";
import {JournalRoutingModule} from "./journal-routing.module";

@NgModule({
  imports: [
    CommonModule,
    JournalRoutingModule
  ],
  declarations: [JournalComponent],
})
export class JournalModule { }
