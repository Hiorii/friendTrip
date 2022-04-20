import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/api/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage.service";
import {TripApiService} from "./services/api/trip-api.service";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "./store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    })
  ],
  providers: [AuthService, LocalStorageService, TripApiService]
})
export class CoreModule { }
