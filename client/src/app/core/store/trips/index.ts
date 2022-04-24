import {Action, createFeatureSelector, createSelector} from "@ngrx/store";
import { State } from './trips.reducer';
import * as fromTrips from './trips.reducer';

export function reducer(state: State, action: Action) {
  return fromTrips.reducer(state, action)
}

export const stateKey = 'trips'

const selectTripsState = createFeatureSelector<fromTrips.State>(stateKey)

//export const selectAllUsersList = createSelector(selectTripsState, fromTrips.getTripUsers)
