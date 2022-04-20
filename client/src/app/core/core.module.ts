import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/api/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage.service";
import {TripApiService} from "./services/api/trip-api.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService, LocalStorageService, TripApiService]
})
export class CoreModule { }
