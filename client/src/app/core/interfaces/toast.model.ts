import {ToastTypeModel} from "../enums/toast-type.model";

export interface ToastModel {
  type: ToastTypeModel;
  text: string;
}
