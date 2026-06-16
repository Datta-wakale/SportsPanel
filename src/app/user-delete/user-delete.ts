import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-delete',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-delete.html',
  styleUrl: './user-delete.scss'
})
export class UserDelete {

  constructor(
    public dialogRef: MatDialogRef<UserDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}