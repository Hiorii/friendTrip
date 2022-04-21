import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthService} from "../../../core/services/api/auth.service";
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
  isLoggedin: boolean = false;

  @Output() handleLoginWithGoogle = new EventEmitter()
  @Output() handleLogin = new EventEmitter()

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    const userData: Partial<UsersModel> = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }

    this.handleLogin.emit(userData);
  }

  loginWithGoogle(): void {
    this.handleLoginWithGoogle.emit()
  }

  logOutWithGoogle(): void {

  }
}
