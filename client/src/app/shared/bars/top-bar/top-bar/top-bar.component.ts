import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {LocalStorageService} from "../../../../core/services/local-storage.service";
import {UsersModel} from "../../../../core/interfaces/users.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  currentUser: UsersModel
  searchForm: FormGroup

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user');

    this.searchForm = this.fb.group({
      search: ['']
    })
  }

}
