import * as reducer from './trips.reducer';
// @ts-ignore
import * as actions from './trips.actions';
import {createFeatureSelector} from "@ngrx/store";

export { reducer }
export { actions }
export const stateKey = 'trips'

// @ts-ignore
const selectTripsState = createFeatureSelector(<reducer.State>(stateKey))
