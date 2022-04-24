import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as actions from './trips.actions';
import {switchMap} from "rxjs";
import {TripApiService} from "../../services/api/trip-api.service";
import {map} from "rxjs/operators";

@Injectable()
export class TripsEffects {
  getTrips$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getTripsDataAction),
      switchMap(() => this.tripApiService
        .getAllTrips()
        .pipe(
          map(manyTrips => actions.setTripsDataAction({ trips: manyTrips })),
        )),
    ))

  constructor(
    private actions$: Actions,
    private tripApiService: TripApiService
  ) { }
}
