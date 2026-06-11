import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slotpop-up',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './slotpop-up.html',
  styleUrl: './slotpop-up.scss'
})
export class SlotpopUp {

  constructor(
    public dialogRef: MatDialogRef<SlotpopUp>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  closePopUp(): void {
    this.dialogRef.close();
  }
  
}