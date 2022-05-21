import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from "../../core/services/local-storage.service";
import {SocialAuthService} from "angularx-social-login";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Output() closeUserMenu = new EventEmitter<boolean>();

  constructor(
    private localStorageService: LocalStorageService,
    private socialAuthService: SocialAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  userLogout() {
    this.localStorageService.removeItem('user');
    this.socialAuthService.signOut();
    this.router.navigate(['/auth'])
    this.closeUserMenu.emit(false);
  }
}
