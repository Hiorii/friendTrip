import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthService} from "../../../core/services/auth.service";
import {UsersModel} from "../../../core/interfaces/users.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;

      if (user) {
        const userData: UsersModel = {
          name: user.firstName,
          surname: user.lastName,
          email: user.email,
          creationDate: new Date(),
          isActive: true,
        }

        this.authService.authWithGoogle(userData)
          .subscribe((data) => console.log(data))
      }

      console.log(this.socialUser)
    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}
