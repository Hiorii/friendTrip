import { NgModule } from '@angular/core';
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";

@NgModule({
  declarations: [MainComponent],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
  ]
})
export class MainModule { }
