import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersModel} from "../interfaces/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  getAllUsersList() {
    return this.http.get<UsersModel[]>(`${this.url}/users`)
  }

  authWithGoogle(userData: Partial<UsersModel>) {
    return this.http.post(
      `${this.url}/auth/google/callback`,
      userData,
    )
  }
}
