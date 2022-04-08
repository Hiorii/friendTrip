import { NgModule } from '@angular/core';
import {AuthComponent} from "./auth.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    AuthRoutingModule
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('832028624727-dr0dl1a26ein5b0l09rb6c1q9rutnm04.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthModule { }
