import * as fromTrips from './trips/trips.reducer';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const tripsKey = 'trips'

export interface State {
  [tripsKey]: fromTrips.State
}

export const reducers: ActionReducerMap<State> = {
  [tripsKey]: fromTrips.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
