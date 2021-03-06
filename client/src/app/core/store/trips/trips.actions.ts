import {createAction, props} from "@ngrx/store";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";
import {TripInfoDataModel} from "../../interfaces/trip-info-data.model";
import {TripPointDataModel} from "../../interfaces/trip-point-data.model";

export const getTripsDataAction = createAction('[Trips] Get Trips Data', props<{ currentUser: UsersModel }>())
export const setTripsDataAction = createAction('[Trips] Set Trips Data', props<{ trips: TripModel[] }>())
export const getTripDataAction = createAction('[Trips] Get Trip Data', props<{ currentUser: UsersModel, id: string }>())
export const setTripDataAction = createAction('[Trips] Set Trip Data', props<{ trip: TripModel }>())

//Add Trip
export const getTripUsersAction = createAction('[Trips] Get Trips Users', props<{ trip: TripModel}>())
export const setTripInfoAction = createAction('[Trips] Set Trip Info', props<{ tripInfo: TripInfoDataModel }>())
export const setTripPointsAction = createAction('[Trips] Set Trip Points', props<{ tripPoints: TripPointDataModel }>())
export const setTripUsersAction = createAction('[Trips] Set Trip Users', props<{ tripUsers: UsersModel[] }>())
