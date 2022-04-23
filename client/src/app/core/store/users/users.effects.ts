import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap, tap} from "rxjs";
import {actions} from "../users";
import {AuthService} from "../../services/api/auth.service";

@Injectable()
export class UsersEffects {
  getAllUsersList$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getAllUsersList),
      switchMap(() => this.authService
        .getAllUsersList()
        .pipe(
          map(allUserList => actions.setAllUsersList({ users: allUserList })),
        )),
    ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
