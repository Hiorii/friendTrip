import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToDoComponent} from "./to-do.component";
import {ToDoRoutingModule} from "./to-do-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ToDoRoutingModule
  ],
  declarations: [ToDoComponent],
})
export class ToDoModule { }
