import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import * as actions from "./users.actions";
import {AuthService} from "../../services/api/auth.service";

@Injectable()
export class UsersEffects {
  getAllUsersList$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getAllUsersListAction),
      switchMap(() => this.authService
        .getAllUsersList()
        .pipe(
          map(allUserList => actions.setAllUsersListAction({ users: allUserList })),
        )),
    ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
