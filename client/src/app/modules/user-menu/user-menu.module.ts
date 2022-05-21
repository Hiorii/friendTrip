import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserMenuComponent} from "./user-menu.component";



@NgModule({
  declarations: [UserMenuComponent],
  exports: [
    UserMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserMenuModule { }
