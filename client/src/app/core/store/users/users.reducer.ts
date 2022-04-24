import {createReducer, on} from "@ngrx/store";
import {UsersModel} from "../../interfaces/users.model";
import * as actions from './users.actions'

export interface State {
  allUsersList: UsersModel[],
  currentUser: UsersModel,
}

const initialState: State = {
  allUsersList: [],
  currentUser: {
    _id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    photo: '',
    creationDate: new Date,
    isActive: false,
    _token: '',
    _tokenExpirationData: new Date,
  }
}

export const reducer = createReducer(
  initialState,
  on(actions.setAllUsersListAction, (state: State, { users }) => ({
    ...state,
    allUsersList: users,
  })),
)

export const getAllUsersList = (state: State) => state.allUsersList
