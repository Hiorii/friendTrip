import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../core/services/api/auth.service";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {UsersModel} from "../../core/interfaces/users.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  socialUser!: SocialUser;
  isSignedUp: boolean = true;
  isLoggedin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
          _token: user.idToken,
          _tokenExpirationData: user.response.expires_at
        }

        this.localStorageService.setItem('user', {
          name: user.firstName,
          email: user.email,
          photo: user.photoUrl,
        })

        this.authService.authWithGoogle(userData)
          .subscribe((data) => {
            this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
          })
      }
    });
  }

  switchMode() {
    this.isSignedUp ? this.isSignedUp = false : this.isSignedUp = true
  }

  registerUser(userData: UsersModel) {
    this.authService.registerUser(userData)
      .subscribe((data) => {
        this.location.replaceState("/")
      })
  }

  loginUser(userData: Partial<UsersModel>) {
    this.authService.loginUser(userData)
      .subscribe((data) => {
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      })
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOutWithGoogle(): void {
    this.localStorageService.removeItem('user');
    this.socialAuthService.signOut();
    this.location.replaceState("/login")
  }
}
