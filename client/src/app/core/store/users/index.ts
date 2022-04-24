import {Action, createFeatureSelector, createSelector} from "@ngrx/store";
import { State } from './users.reducer';
import * as fromUsers from './users.reducer';

export function reducer(state: State, action: Action) {
  return fromUsers.reducer(state, action)
}

export const stateKey = 'users'

const selectUsersState = createFeatureSelector<fromUsers.State>(stateKey)

export const selectAllUsersList = createSelector(selectUsersState, fromUsers.getAllUsersList)
