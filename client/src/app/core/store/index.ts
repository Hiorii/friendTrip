import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromTrips from './trips/trips.reducer';
import * as fromUsers from './users/users.reducer';

export const tripsKey = 'trips'
export const usersKey = 'users';

export interface State {
  [tripsKey]: fromTrips.State;
  [usersKey]: fromUsers.State
}

export const reducers: ActionReducerMap<State> = {
  [tripsKey]: fromTrips.reducer,
  [usersKey]: fromUsers.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
