import {createReducer, on} from "@ngrx/store";
import {UsersModel} from "../../interfaces/users.model";
import {actions} from "../users";

export interface State {
  allUsersList: UsersModel[],
  currentUser: UsersModel,
  tripUsers: {
    tripUserList: UsersModel[],
    availableUserList: UsersModel[]
  }
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
  },
  tripUsers: {
    tripUserList: [],
    availableUserList: []
  }
}

export const reducer = createReducer(
  initialState,
  on(actions.setAllUsersList, (state: State, { users }) => ({
    ...state,
    allUsersList: users,
  })),
)

export const getAllUsersList = (state: State) => state.allUsersList
