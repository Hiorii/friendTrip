import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogModel} from "../../core/interfaces/dialog.model";
import {DialogComponent} from "./dialog.component";

@Injectable({
  providedIn: 'root'
})

export class DialogService {
  constructor(
    private dialog: MatDialog,
  ) { }

  openConfirmationDialog(data: DialogModel) {
    return this.dialog.open(DialogComponent, { data })
  }
}
