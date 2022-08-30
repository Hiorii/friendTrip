import {createAction, props} from "@ngrx/store";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";
import {TripInfoDataModel} from "../../interfaces/trip-info-data.model";
import {TripPointDataModel} from "../../interfaces/trip-point-data.model";
import {MarkerModel} from "../../interfaces/marker.model";
import {VotingStatusModel} from "../../enums/voting-status.model";
import {WaypointsModel} from "../../interfaces/waypoints.model";

export const getTripsDataAction = createAction('[Trips] Get Trips Data', props<{ currentUser: UsersModel }>())
export const setTripsDataAction = createAction('[Trips] Set Trips Data', props<{ trips: TripModel[] }>())
export const getTripDataAction = createAction('[Trips] Get Trip Data', props<{ currentUser: UsersModel, id: string }>())
export const setTripDataAction = createAction('[Trips] Set Trip Data', props<{ trip: TripModel }>())

//Trip
export const getTripUsersAction = createAction('[Trips] Get Trips Users', props<{ trip: TripModel}>())
export const setTripInfoAction = createAction('[Trips] Set Trip Info', props<{ tripInfo: TripInfoDataModel }>())
export const setTripPointsAction = createAction('[Trips] Set Trip Points', props<{ tripPoints: TripPointDataModel }>())
export const setTripUsersAction = createAction('[Trips] Set Trip Users', props<{ tripUsers: UsersModel[] }>())

//Marker
export const saveTripMarkersAction = createAction('[Trips] Save Trips Markers', props<{ id: string, currentUser: string, markers: MarkerModel[]}>())
export const setTripMarkersAction = createAction('[Trips] Set Trips Markers', props<{ markers: MarkerModel[]}>())
export const updateTripMarkersAction = createAction('[Trips] Update Trips Markers', props<{ id: string, currentUser: string, markers: MarkerModel[]}>())
export const removeTripMarkersAction = createAction('[Trips] Remove Trips Markers', props<{ id: string, currentUser: string, markerId: string}>())
export const voteOnMarkerAction = createAction('[Trips] Vote Trips Markers', props<{ id: string, currentUser: UsersModel, votingStatus: VotingStatusModel}>())

//Waypoints
export const saveTripWaypointsAction = createAction('[Trips] Save Trips Waypoints', props<{ id: string, currentUser: string, waypoints: WaypointsModel}>())
export const removeTripWaypointAction = createAction('[Trips] Remove Trips Waypoint', props<{ id: string, currentUser: string, waypointId: string}>())
