import {createAction, props} from "@ngrx/store";
import {UsersModel} from "../../interfaces/users.model";

export const getAllUsersList = createAction('[Users] Get All Users List')
export const setAllUsersList = createAction('[Users] Set All User List', props<{ users: UsersModel[] }>())
