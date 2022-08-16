import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UsersModel} from "../../../core/interfaces/users.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoggedin: boolean = false;
  signupForm!: UntypedFormGroup;

  @Output() handleLoginWithGoogle = new EventEmitter()
  @Output() handleRegister = new EventEmitter()

  constructor(
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser(): void {
    const userData: UsersModel = {
      name: this.signupForm.get('name').value,
      surname: this.signupForm.get('surname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      creationDate: new Date(),
      usersTrips: [],
      isActive: true,
    }

    this.handleRegister.emit(userData);
  }

  loginWithGoogle(): void {
    this.handleLoginWithGoogle.emit()
  }

  logOutWithGoogle(): void {

  }
}
