import {createAction, props} from "@ngrx/store";
import {UsersModel} from "../../interfaces/users.model";
import {CarModel} from "../../interfaces/car.model";

export const getAllUsersListAction = createAction('[Users] Get All Users List')
export const setAllUsersListAction = createAction('[Users] Set All Users List', props<{ users: UsersModel[] }>())

export const setCurrentUserAction = createAction('[Users] Set Current User', props<{ currentUser: UsersModel }>())

export const setUserNewCar = createAction('[Users] Set User New Car', props<{ userCarData: CarModel }>())
