import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title: string;
  desc: string;
  yes: string;
  no: string;
  confirmButtonText= 'Confirm';
  cancelButtonText= 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
      this.title = data.title || this.title;
      this.desc = data.desc || this.desc;
      this.yes = data.yes || this.yes;
      this.no = data.no || this.no;
  }

  onConfirmClick(userAgree: boolean) {
    this.dialogRef.close(userAgree);
  }
}
