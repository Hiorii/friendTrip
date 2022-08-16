import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UsersModel} from "../../../core/interfaces/users.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  isLoggedin: boolean = false;

  @Output() handleLoginWithGoogle = new EventEmitter()
  @Output() handleLogin = new EventEmitter()

  constructor(
    private fb: UntypedFormBuilder,
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
