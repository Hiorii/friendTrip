import {Action, createFeatureSelector, createSelector} from "@ngrx/store";
import { State } from './trips.reducer';
import * as fromTrips from './trips.reducer';

export function reducer(state: State, action: Action) {
  return fromTrips.reducer(state, action)
}

export const stateKey = 'trips'

const selectTripsState = createFeatureSelector<fromTrips.State>(stateKey)

// export const selectAllUsersList = createSelector(selectTripsState, fromTrips.getTripUsers)

export const selectAllTripsList = createSelector(selectTripsState, fromTrips.getAllTripsList)
export const selectCurrentTrip = createSelector(selectTripsState, fromTrips.getCurrentTrip)

export const selectTripInfo = createSelector(selectTripsState, fromTrips.getTripInfo)
export const selectTripPoints = createSelector(selectTripsState, fromTrips.getTripPoints)
export const selectTripUsers = createSelector(selectTripsState, fromTrips.getTripUsers)
export const selectTripMessages = createSelector(selectTripsState, fromTrips.getTripMessages)
export const selectTripMarkers = createSelector(selectTripsState, fromTrips.getTripMarkers)
export const selectTripWaypoints = createSelector(selectTripsState, fromTrips.getTripWaypoints)
