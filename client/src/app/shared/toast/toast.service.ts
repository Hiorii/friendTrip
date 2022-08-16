import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastComponent} from "./toast.component";
import {ToastTypeModel} from "../../core/enums/toast-type.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastOpenDuration: number = 5;

  constructor(private toast: MatSnackBar) { }

  success(text: string) {
    this.toast.openFromComponent(ToastComponent, {
      data: {
        text: text,
        type: 'toastSuccess'
      },
      duration: this.toastOpenDuration * 1000,
      panelClass: 'toastSuccess'
    })
  }

  warning(text: string) {
    this.toast.openFromComponent(ToastComponent, {
      data: {
        text: text,
        type: 'toastWarning'
      },
      duration: this.toastOpenDuration * 1000,
      panelClass: 'toastWarning'
    })
  }

  danger(text: string) {
    this.toast.openFromComponent(ToastComponent, {
      data: {
        text: text,
        type: 'toastDanger'
      },
      duration: this.toastOpenDuration * 1000,
      panelClass: 'toastDanger'
    })
  }
}
