import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as actions from './trips.actions';
import {combineLatest, switchMap, tap, withLatestFrom} from "rxjs";
import {TripApiService} from "../../services/api/trip-api.service";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../users";

@Injectable()
export class TripsEffects {
  getTrips$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getTripsDataAction),
      switchMap(({currentUser}) => this.tripApiService
        .getAllTrips(currentUser)
        .pipe(
          map(manyTrips => actions.setTripsDataAction({ trips: manyTrips.usersTrips })),
        )),
    ))

  getTrip$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getTripDataAction),
      switchMap(({currentUser ,id}) => this.tripApiService
        .getSingleTrip(currentUser, id)
        .pipe(
          map(singleTrip => actions.setTripDataAction({ trip: singleTrip })),
        )),
    ))

  constructor(
    private actions$: Actions,
    private tripApiService: TripApiService
  ) { }
}
