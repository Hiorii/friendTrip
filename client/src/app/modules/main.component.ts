import {Component, OnChanges, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllUsersListAction, setCurrentUserAction} from "../core/store/users/users.actions";
import {LocalStorageService} from "../core/services/local-storage.service";
import {AuthService} from "../core/services/api/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnChanges {

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.setUsers();
  }

  ngOnChanges() {
    this.setUsers();
  }

  private setUsers(): void {
    const currentUser = this.localStorageService.getItem('user')?.email

    this.store.dispatch(getAllUsersListAction())

    if (currentUser) {
      this.authService.getCurrentUser(currentUser).subscribe((data: any) => {
        this.store.dispatch(setCurrentUserAction({ currentUser: data }))
      })
    }
  }
}
