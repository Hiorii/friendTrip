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
    }[]
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
  ]
}

export const reducer = createReducer(
  initialState,
  on(actions.getTripsDataAction, (state: State) => ({
    ...state,
  })),
  on(actions.setTripDataAction, (state: State, { trip }) => ({
    ...state,
    tripsList: [...state.tripsList, trip],
  })),
  on(actions.setTripsDataAction, (state: State, { trips }) => ({
    ...state,
    tripsList: [...trips],
  })),
)
