import {createAction, props} from "@ngrx/store";
import {TripModel} from "../../interfaces/trip.model";
import {UsersModel} from "../../interfaces/users.model";
import {TripInfoDataModel} from "../../interfaces/trip-info-data.model";
import {TripPointDataModel} from "../../interfaces/trip-point-data.model";
import {MarkerModel} from "../../interfaces/marker.model";
import {VotingStatusModel} from "../../enums/voting-status.model";
import {WaypointsModel} from "../../interfaces/waypoints.model";
import {TripItemModel} from "../../interfaces/trip-item.model";
import {CarModel} from "../../interfaces/car.model";

export const getTripsDataAction = createAction('[Trips] Get Trips Data', props<{ currentUser: UsersModel }>())
export const setTripsDataAction = createAction('[Trips] Set Trips Data', props<{ trips: TripModel[] }>())
export const getTripDataAction = createAction('[Trips] Get Trip Data', props<{ currentUser: UsersModel, id: string }>())
export const setTripDataAction = createAction('[Trips] Set Trip Data', props<{ trip: TripModel }>())
export const removeTripUsersAction = createAction('[Trips] Remove Trips Users', props<{ currentUser: string, tripId: string}>())

//Trip
export const getTripUsersAction = createAction('[Trips] Get Trips Users', props<{ trip: TripModel}>())
export const setTripInfoAction = createAction('[Trips] Set Trip Info', props<{ tripInfo: TripInfoDataModel }>())
export const setTripPointsAction = createAction('[Trips] Set Trip Points', props<{ tripPoints: TripPointDataModel }>())
export const setTripUsersAction = createAction('[Trips] Set Trip Users', props<{ tripUsers: UsersModel[] }>())
export const setTripDistanceAction = createAction('[Trips] Set Trip Distance', props<{ id: string, currentUser: string, distance: number }>())
export const setTripDurationAction = createAction('[Trips] Set Trip Duration', props<{ id: string, currentUser: string, duration: string }>())
export const setTripItemsCostAction = createAction('[Trips] Set Trip Item Cost', props<{ id: string, currentUser: string, item: TripItemModel }>())
export const removeTripItemAction = createAction('[Trips] Remove Trips Item', props<{ id: string, currentUser: string, itemId: string }>())
export const setTripItemAlreadyPaidAction = createAction('[Trips] Set Trip Item Already Paid', props<{ id: string, currentUser: string, alreadyPaid: {tripId: string, user: string, amount: number} }>())
export const setTripCarAction = createAction('[Trips] Set Trip Car', props<{ id: string, currentUser: string, car: CarModel }>())
export const setTripFuelCostAction = createAction('[Trips] Set Trip Fuel Cost', props<{ id: string, currentUser: string, fuelCost: number }>())

//Marker
export const saveTripMarkersAction = createAction('[Trips] Save Trips Markers', props<{ id: string, currentUser: string, markers: MarkerModel[]}>())
export const setTripMarkersAction = createAction('[Trips] Set Trips Markers', props<{ markers: MarkerModel[]}>())
export const updateTripMarkersAction = createAction('[Trips] Update Trips Markers', props<{ id: string, currentUser: string, markers: MarkerModel[]}>())
export const removeTripMarkersAction = createAction('[Trips] Remove Trips Markers', props<{ id: string, currentUser: string, markerId: string, isWaypointAdded?: boolean}>())
export const voteOnMarkerAction = createAction('[Trips] Vote Trips Markers', props<{ id: string, currentUser: UsersModel, votingStatus: VotingStatusModel}>())

//Waypoints
export const saveTripWaypointsAction = createAction('[Trips] Save Trips Waypoints', props<{ id: string, currentUser: string, waypoints: WaypointsModel, markerId: string}>())
export const removeTripWaypointAction = createAction('[Trips] Remove Trips Waypoint', props<{ id: string, currentUser: string, waypointId: string}>())
