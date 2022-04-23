import {createAction, props} from "@ngrx/store";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";


export const getTripsDataAction = createAction('[Trips] Get Trips Data')
export const setTripDataAction = createAction('[Trips] Set Trip Data', props<{ trip: TripModel }>())
export const setTripsDataAction = createAction('[Trips] Set Trips Data', props<{ trips: TripModel[] }>())

//Add Trip
export const addTripsUserAction = createAction('[Trips] Add Trips User', props<{ users: UsersModel[] }>())
