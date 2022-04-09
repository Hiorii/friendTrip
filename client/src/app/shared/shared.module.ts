import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './bars/top-bar/top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from "@angular/forms";
import { BottomBarComponent } from './bars/bottom-bar/bottom-bar.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TopBarComponent,
    BottomBarComponent
  ],
  exports: [
    TopBarComponent,
    BottomBarComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
