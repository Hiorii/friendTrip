import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/api/auth.service";
import {LocalStorageService} from "../../../../core/services/local-storage.service";
import {UsersModel} from "../../../../core/interfaces/users.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  currentUser: UsersModel
  searchForm: UntypedFormGroup
  isUserMenuVisible = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user');

    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  showUserMenu(): void {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  getUrl() {
    return this.currentUser.photo;
  }
}
