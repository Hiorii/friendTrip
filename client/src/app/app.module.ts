import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {MainModule} from "./modules/main.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material.module";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MainModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule.forRoot({ type: 'ball-beat' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
