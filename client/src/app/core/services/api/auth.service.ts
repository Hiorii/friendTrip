import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UsersModel} from "../../interfaces/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  getAllUsersList() {
    return this.http.get<UsersModel[]>(`${this.url}/users`)
  }

  getCurrentUser(userEmail: string) {
    const params = new HttpParams().append('email', userEmail);

    return this.http.get<UsersModel[]>(`${this.url}/users/currentUser`, { params })
  }

  registerUser(userData: Partial<UsersModel>) {
    return this.http.post(
      `${this.url}/auth/register`,
      userData
    )
  }

  loginUser(userData: Partial<UsersModel>) {
    return this.http.post(
      `${this.url}/auth/login`,
      userData
    )
  }

  authWithGoogle(userData: Partial<UsersModel>) {
    return this.http.post(
      `${this.url}/auth/google/callback`,
      userData,
    )
  }
}
