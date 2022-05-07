import {UsersModel} from "../../interfaces/users.model";
import {createReducer, on} from "@ngrx/store";
import * as actions from './trips.actions';

export interface State {
  tripsList:
    {
      _id?: string,
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
      }
      tripUsers?: UsersModel[],
    }[],
  currentTrip:
    {
      _id?: string,
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
      }
      tripUsers?: UsersModel[],
    }
}

const initialState: State = {
  tripsList: [
    {
      _id: '',
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
      tripUsers: [],
    }
  ],
  currentTrip:
    {
      _id: '',
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
      tripUsers: [],
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
)

export const getAllTripsList = (state: State) => state.tripsList
export const getCurrentTrip = (state: State) => state.currentTrip

export const getTripInfo = (state: State) => state.currentTrip.travelInfoData
export const getTripPoints = (state: State) => state.currentTrip.travelPoints
export const getTripUsers = (state: State) => state.currentTrip.tripUsers
