import {UsersModel} from "../../interfaces/users.model";
import {createReducer, on} from "@ngrx/store";
import * as actions from './trips.actions';
import {MarkerModel} from "../../interfaces/marker.model";
import {WaypointsModel} from "../../interfaces/waypoints.model";
import {TripItemModel} from "../../interfaces/trip-item.model";

export interface State {
  tripsList:
    {
      _id?: string,
      id: string,
      travelInfoData: {
        travelName: string,
        travelPlannedTotalCost?: number,
        travelPhoto?: string,
      },
      travelPoints: {
        startPoint: {
          address: string,
          latitude: number,
          longitude: number,
        },
        destinationPoint: {
          address: string,
          latitude: number,
          longitude: number,
        },
      },
      creator: UsersModel,
      tripUsers?: UsersModel[],
      messages?: any[],
      markers?: MarkerModel[],
      waypoints?: WaypointsModel[],
      totalTripDistance?: number;
      totalTripDuration?: string;
      tripItems?: TripItemModel[],
    }[],
  currentTrip:
    {
      _id?: string,
      id: string,
      travelInfoData: {
        travelName: string,
        travelPlannedTotalCost?: number,
        travelPhoto?: string,
      },
      travelPoints: {
        startPoint: {
          address: string,
          latitude: number,
          longitude: number,
        },
        destinationPoint: {
          address: string,
          latitude: number,
          longitude: number,
        },
      },
      creator: UsersModel,
      tripUsers?: UsersModel[],
      messages?: any[],
      markers?: MarkerModel[],
      waypoints?: WaypointsModel[],
      totalTripDistance?: number;
      totalTripDuration?: string;
      tripItems?: TripItemModel[],
    }
}

const initialState: State = {
  tripsList: [
    {
      _id: '',
      id: '',
      travelInfoData: {
        travelName: '',
        travelPlannedTotalCost: 0,
        travelPhoto: '',
      },
      travelPoints: {
        startPoint: {
          address: '',
          latitude: 0,
          longitude: 0,
        },
        destinationPoint: {
          address: '',
          latitude: 0,
          longitude: 0,
        },
      },
      creator: null,
      tripUsers: [],
      messages: [],
      markers: [],
      waypoints: [],
      totalTripDistance: 0,
      totalTripDuration: '',
      tripItems: [],
    }
  ],
  currentTrip:
    {
      _id: '',
      id: '',
      travelInfoData: {
        travelName: '',
        travelPlannedTotalCost: 0,
        travelPhoto: '',
      },
      travelPoints: {
        startPoint: {
          address: '',
          latitude: 0,
          longitude: 0,
        },
        destinationPoint: {
          address: '',
          latitude: 0,
          longitude: 0,
        },
      },
      creator: null,
      tripUsers: [],
      messages: [],
      markers: [],
      waypoints: [],
      totalTripDistance: 0,
      totalTripDuration: '',
      tripItems: [],
    }
}

export const reducer = createReducer(
  initialState,
  on(actions.getTripsDataAction, (state: State) => ({
    ...state,
  })),
  on(actions.setTripDataAction, (state: State, { trip }) => ({
    ...state,
    currentTrip: trip,
  })),
  on(actions.setTripsDataAction, (state: State, { trips }) => ({
    ...state,
    tripsList: [...trips],
  })),
  on(actions.setTripInfoAction, (state: State, { tripInfo }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      travelInfoData: tripInfo
    }
  })),
  on(actions.setTripPointsAction, (state: State, { tripPoints }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      travelPoints: tripPoints
    }
  })),
  on(actions.setTripUsersAction, (state: State, { tripUsers }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      tripUsers: tripUsers
    }
  })),
  on(actions.setTripMarkersAction, (state: State, { markers }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      markers: markers
    }
  })),
  on(actions.setTripDistanceAction, (state: State, { distance }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      totalTripDistance: distance
    }
  })),
  on(actions.setTripDurationAction, (state: State, { duration }) => ({
    ...state,
    currentTrip: {
      ...state.currentTrip,
      totalTripDuration: duration
    }
  }))
)

export const getAllTripsList = (state: State) => state.tripsList
export const getCurrentTrip = (state: State) => state.currentTrip

export const getTripInfo = (state: State) => state.currentTrip?.travelInfoData
export const getTripPoints = (state: State) => state.currentTrip?.travelPoints
export const getTripUsers = (state: State) => state.currentTrip?.tripUsers
export const getTripMessages = (state: State) => state.currentTrip?.messages
export const getTripMarkers = (state: State) => state.currentTrip?.markers
export const getTripWaypoints= (state: State) => state.currentTrip?.waypoints
export const getTripDistance = (state: State) => state.currentTrip?.totalTripDistance
export const getTripDuration = (state: State) => state.currentTrip?.totalTripDuration
export const getTripItems = (state: State) => state.currentTrip?.tripItems
