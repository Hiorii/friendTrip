import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthService} from "../../../core/services/auth.service";
import {UsersModel} from "../../../core/interfaces/users.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {Location} from "@angular/common";

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
    private location: Location,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
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
          photo: user.photoUrl,
          creationDate: new Date(),
          isActive: true,
        }

        this.localStorageService.setItem('user', {
          name: user.firstName,
          email: user.email,
          photo: user.photoUrl,
        })

        this.authService.authWithGoogle(userData)
          .subscribe((data) => {
            this.location.replaceState("/")
          })
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.localStorageService.removeItem('user');
    this.socialAuthService.signOut();
    this.location.replaceState("/login")
  }
}
