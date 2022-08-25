import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as actions from './trips.actions';
import {catchError, combineLatest, EMPTY, exhaustMap, switchMap, tap, withLatestFrom} from "rxjs";
import {TripApiService} from "../../services/api/trip-api.service";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../users";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ToastService} from "../../../shared/toast/toast.service";
import {removeTripMarkersAction,  updateTripMarkersAction, voteOnMarkerAction} from "./trips.actions";
import { Router} from "@angular/router";

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

  // saveMarkersTrip$ = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(actions.saveTripMarkersAction),
  //     exhaustMap(({ id, currentUser, markers }) => this.dialog
  //       .openConfirmationDialog({
  //         title: 'Travel points save',
  //         desc: 'Are you sure you want to save added travel points?'
  //       })
  //       .afterClosed()
  //       .pipe(
  //         tap(() => console.log(id, currentUser, markers)),
  //         switchMap(confirmed => (confirmed
  //         ? this.tripApiService.addNewMarkers(id, currentUser, markers)
  //               .pipe(
  //                 catchError(err => {
  //                   this.toast.danger(err);
  //
  //                   return EMPTY;
  //                 }),
  //                 tap(_ => this.toast.success('Your markers has been saved')),
  //                 map(() => actions.setTripMarkersAction({ markers: markers }))
  //               )
  //         : EMPTY ))
  //       )
  //     )
  //   )
  // )

  saveMarkersTrip$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.saveTripMarkersAction),
      exhaustMap(({ id, currentUser, markers }) => this.dialog
        .openConfirmationDialog({
          title: 'Travel points save',
          desc: 'Are you sure you want to save added travel points?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => {
            if (confirmed) {
              return [
                actions.setTripMarkersAction({ markers: markers }),
                actions.updateTripMarkersAction({id, currentUser, markers} )
              ]
            }
          })
        )
      )
    )
  )

  saveWaypointsTrip$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.saveTripWaypointsAction),
      exhaustMap(({ id, currentUser, waypoints }) => this.dialog
        .openConfirmationDialog({
          title: 'Waypoint save',
          desc: 'Are you sure you want to add waypoints to your trip?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
          ? this.tripApiService.addNewWaypoints(id, currentUser, waypoints)
              .pipe(
                catchError(err => {
                  this.toast.danger(err)
                  return EMPTY;
                }),
                map((tripData: any) => actions.setTripDataAction( { trip: tripData })),
                tap(_ => {
                  this.toast.success('Your waypoints has been added')
                  window.location.reload()
                }),
              )
          : EMPTY
          ))
        )
      )
    )
  )

  updateTripMarkersAction$ = createEffect(() => this.actions$  // przekazac do strzału api cała userTrip zupgradowaną i to wtedy można użyć  wapi razem z user email
    .pipe(
      ofType(updateTripMarkersAction),
      switchMap(({ id, currentUser, markers }) => this.tripApiService
        .addNewMarkers(id, currentUser, markers)
        .pipe(
          catchError(err => {
            this.toast.danger(err);

            return EMPTY;
          }),
          map(() => actions.setTripMarkersAction({ markers: markers })),
          tap(_ => {
            this.toast.success('Your markers has been saved')
            window.location.reload()
          }),
        )
      )
    )
  )

  removeTripMarkersAction$ = createEffect(() => this.actions$
    .pipe(
      ofType(removeTripMarkersAction),
      withLatestFrom(this.store.select(selectCurrentUser)),
      exhaustMap(([{ id, currentUser, markerId }, currentUserData]) => this.dialog
        .openConfirmationDialog({
          title: 'Travel points remove',
          desc: 'Are you sure you want to remove travel point?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
          ? this.tripApiService.removeMarker(id, currentUser, markerId)
            .pipe(
              catchError(error => {
                this.toast.danger(error)
                return EMPTY
              }),
              map((tripData: any) => actions.setTripDataAction( { trip: tripData })),
              tap(_ => {
                this.toast.success('Your markers has been removed')
                window.location.reload()
              }),
            )
          : EMPTY
          ))
        )
      )
    )
  )

  voteTripMarkerAction$ = createEffect(() => this.actions$
      .pipe(
        ofType(voteOnMarkerAction),
        exhaustMap(({ id, currentUser, votingStatus }) => this.dialog
          .openConfirmationDialog({
            title: 'Travel points vote',
            desc: 'Do you want to save chosen decision?'
          })
          .afterClosed()
          .pipe(
            switchMap(confirmed => (confirmed
              ? this.tripApiService.voteOnMarker(id, currentUser, votingStatus)
                  .pipe(
                    catchError(error => {
                      this.toast.danger(error)
                      return EMPTY
                    }),
                    tap(data => console.log(data)),
                    map((tripData: any) => actions.setTripDataAction( { trip: tripData })),
                    tap(_ => {
                      window.location.reload()
                      this.toast.success('Your vote has been added')
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
    private tripApiService: TripApiService,
    private dialog: DialogService,
    private toast: ToastService,
    private store: Store,
    private router: Router,
  ) { }
}
