import { Component,inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogTitle,MatDialogContent,MatDialogActions} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule,MatDialogTitle,MatDialogContent, MatDialogActions],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {

  private dialogRef = inject(MatDialogRef<ConfirmDialog>);
  data = inject(MAT_DIALOG_DATA);

  //confirm
  confirm(): void {
    this.dialogRef.close(true);
  }
  //cancel
  cancel(): void {
    this.dialogRef.close(false);
  }


}
