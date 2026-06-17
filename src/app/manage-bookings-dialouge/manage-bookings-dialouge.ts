import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './manage-bookings-dialouge.html',
  styleUrl: './manage-bookings-dialouge.scss'
})
export class BookingConfirmDialog {

  data = inject(MAT_DIALOG_DATA);

  dialogRef = inject(
    MatDialogRef<BookingConfirmDialog>
  );

  confirm(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}