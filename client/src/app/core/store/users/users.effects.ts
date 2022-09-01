import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, switchMap, tap, withLatestFrom} from "rxjs";
import * as actions from "./users.actions";
import {AuthService} from "../../services/api/auth.service";
import {removeTripMarkersAction} from "../trips/trips.actions";
import {selectCurrentUser} from "./index";
import {getAllUsersListAction, setUserNewCar} from "./users.actions";
import {TripApiService} from "../../services/api/trip-api.service";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ToastService} from "../../../shared/toast/toast.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

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

  // @ts-ignore
  removeTripMarkersAction$ = createEffect(() => this.actions$
    .pipe(
      ofType(setUserNewCar),
      exhaustMap(({ userCarData }) => this.dialog
        .openConfirmationDialog({
          title: 'Add new car',
          desc: 'Are you sure you want to add new car?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
              ? this.tripApiService.addNewUserCar(userCarData)
                .pipe(
                  catchError(error => {
                    this.toast.danger(error)
                    return EMPTY
                  }),
                  map(() => actions.getAllUsersListAction()),
                  tap(_ => {
                    this.toast.success('Your car has been added')
                    window.location.reload()
                  }),
                )
              : EMPTY
          ))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tripApiService: TripApiService,
    private dialog: DialogService,
    private toast: ToastService,
  ) { }
}
