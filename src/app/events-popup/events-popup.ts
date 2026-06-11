import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QRCodeComponent } from 'angularx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification-service';
@Component({
  selector: 'app-events-popup',
  standalone: true,
  imports: [ CommonModule, FormsModule,MatDialogModule, MatFormFieldModule,MatInputModule, QRCodeComponent],
  templateUrl: './events-popup.html',
  styleUrl: './events-popup.scss'
})
export class EventsPopup implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EventsPopup>,
    private toastr: ToastrService,
    private notificationService : NotificationService
       
  ) {}
  // boolean flag to hide qr
  showPayment = false;

  // Registration Details
  teamName: string = '';
  numberOfPlayers: string = '';
  contactPerson: string = '';
  mobile: string = '';
  amount: number = 1000;
  upiData: string = '';

  ngOnInit(): void {

    this.upiData = `upi://pay?pa=8766968714-3@ybl&pn=SportsArena&am=${this.amount}&cu=INR`;
  }

  proceedToPay(): void {

    if (!this.teamName || !this.numberOfPlayers || !this.contactPerson || !this.mobile ) {

       this.toastr.warning(
        'Please fill all fields',
        'Required'
      );  
      /* this.notificationService.setToast('warning','Please fill all fields',
        'Required') */
    
      return;
    }

    if (this.mobile.length !== 10) {
      this.toastr.warning('Enter valid mobile number','Required' );
      return;
    }
    this.showPayment = true;
  }
  // open qr when payment done
  paymentDone(): void {

    this.dialogRef.close({
      success: true,
      teamName: this.teamName,
      numberOfPlayers: this.numberOfPlayers,
      contactPerson: this.contactPerson,
      mobile: this.mobile
    });
    // success notification
    this.toastr.success( 'Event Registration Successful','Success');
  }
  // when click on cancel close the dialouge box
  cancel(): void {
    this.dialogRef.close({
      success: false
    });
  }
  

}