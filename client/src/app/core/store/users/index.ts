import * as reducer from './users.reducer';
// @ts-ignore
import * as actions from './users.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export { reducer }
export { actions }
export const stateKey = 'users'

// @ts-ignore
const selectUsersState = createFeatureSelector(<reducer.State>(stateKey))

export const selectPlansList = createSelector(selectUsersState, () => reducer.getAllUsersList)
