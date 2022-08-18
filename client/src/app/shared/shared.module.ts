import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './bars/top-bar/top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from "@angular/forms";
import { BottomBarComponent } from './bars/bottom-bar/bottom-bar.component';
import {RouterModule} from "@angular/router";
import {GoogleMapModule} from "./google-map/google-map.module";
import { ButtonComponent } from './button/button.component';
import {UserMenuModule} from "../modules/user-menu/user-menu.module";
import {ChatModule} from "./chat/chat.module";
import {DialogComponent} from "./dialog/dialog.component";
import {MaterialModule} from "./material.module";
import {ToastComponent} from "./toast/toast.component";

@NgModule({
  declarations: [
    TopBarComponent,
    BottomBarComponent,
    ButtonComponent,
    DialogComponent,
    ToastComponent,
  ],
  exports: [
    TopBarComponent,
    BottomBarComponent,
    ButtonComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapModule,
    UserMenuModule,
    ChatModule,
    MaterialModule,
  ]
})
export class SharedModule { }
