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
import {
  getTripsDataAction,
  getTripUsersAction, removeTripItemAction,
  removeTripMarkersAction,
  removeTripWaypointAction, setTripDistanceAction, setTripDurationAction, setTripItemsCostAction,
  updateTripMarkersAction,
  voteOnMarkerAction
} from "./trips.actions";
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

  removeTrip$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.removeTripUsersAction),
      exhaustMap(({ currentUser, tripId }) => this.dialog
        .openConfirmationDialog({
          title: 'Remove the trip',
          desc: 'Trip will be removed for you and all participants. Are you sure you want to remove it?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
              ? this.tripApiService.removeTrip(currentUser, tripId)
                .pipe(
                  catchError(err => {
                    this.toast.danger(err)
                    return EMPTY;
                  }),
                  map((user: any) => actions.getTripsDataAction({ currentUser: user })),
                  tap(_ => {
                    this.toast.success('Your trip has been removed')
                  }),
                )
              : EMPTY
          ))
        )
      )
    )
  )

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
      exhaustMap(({ id, currentUser, waypoints, markerId }) => this.dialog
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
                map((tripData: any) => actions.removeTripMarkersAction( { id: id, currentUser: currentUser, markerId: markerId, isWaypointAdded: true })),
                tap(_ => {
                  this.toast.success('Your waypoints has been added')
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
      exhaustMap(([{ id, currentUser, markerId, isWaypointAdded }, currentUserData]) => this.dialog
        .openConfirmationDialog({
          title: 'Travel points remove',
          desc: isWaypointAdded ? 'Marker will be replace by waypoint. Are you sure?' : 'Are you sure you want to remove Marker?'
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

  removeTripWaypointsAction$ = createEffect(() => this.actions$
    .pipe(
      ofType(removeTripWaypointAction),
      exhaustMap(({ id, currentUser, waypointId }) => this.dialog
        .openConfirmationDialog({
          title: 'Waypoint remove',
          desc: 'Are you sure you want to remove waypoint?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
              ? this.tripApiService.removeWaypoint(id, currentUser, waypointId)
                .pipe(
                  catchError(error => {
                    this.toast.danger(error)
                    return EMPTY
                  }),
                  map((tripData: any) => actions.setTripDataAction( { trip: tripData })),
                  tap(_ => {
                    this.toast.success('Your waypoint has been removed')
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

  addTripDistance$ = createEffect(() => this.actions$
    .pipe(
      ofType(setTripDistanceAction),
      switchMap(({ id, currentUser, distance }) => this.tripApiService.addTripDistance(id, currentUser, distance)
        .pipe(
          catchError(error => {
            this.toast.danger(error)
            return EMPTY
          }),
          map((tripData: any) => actions.getTripUsersAction( { trip: tripData[0] })),
        )
      ))
    )


  addTripDuration$ = createEffect(() => this.actions$
    .pipe(
      ofType(setTripDurationAction),
      switchMap(({ id, currentUser, duration }) => this.tripApiService.addTripDuration(id, currentUser, duration)
        .pipe(
          catchError(error => {
            this.toast.danger(error)
            return EMPTY
          }),
          map((tripData: any) => actions.getTripUsersAction( { trip: tripData[0] })),
        )
      ))
  )

  setTripItemsCost$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.setTripItemsCostAction),
      exhaustMap(({ id, currentUser, item }) => this.dialog
        .openConfirmationDialog({
          title: 'New item add',
          desc: 'Are you sure you want to add new item to trip?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
              ? this.tripApiService.addNewTripItem(id, currentUser, item)
                .pipe(
                  catchError(err => {
                    this.toast.danger(err)
                    return EMPTY;
                  }),
                  map((tripData: any) => actions.setTripDataAction( { trip: tripData[0] })),
                  tap(_ => {
                    this.toast.success('Your item has been added')
                  }),
                )
              : EMPTY
          ))
        )
      )
    )
  )

  removeTripItemAction$ = createEffect(() => this.actions$
    .pipe(
      ofType(removeTripItemAction),
      exhaustMap(({ id, currentUser, itemId }) => this.dialog
        .openConfirmationDialog({
          title: 'Trip item remove',
          desc: 'Are you sure you want to remove trip item?'
        })
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed
              ? this.tripApiService.removeTripItem(id, currentUser, itemId)
                .pipe(
                  catchError(error => {
                    this.toast.danger(error)
                    return EMPTY
                  }),
                  map((tripData: any) => actions.setTripDataAction( { trip: tripData[0] })),
                  tap(_ => {
                    this.toast.success('Your item has been removed')
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
