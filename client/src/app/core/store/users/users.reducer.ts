import {createReducer, on} from "@ngrx/store";
import {UsersModel} from "../../interfaces/users.model";

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
)
