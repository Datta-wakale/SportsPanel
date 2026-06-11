import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-popup',
  imports: [ CommonModule, FormsModule, MatDialogModule, QRCodeComponent,  MatFormFieldModule, MatInputModule,  MatAnchor],
  templateUrl: './payment-popup.html',
  styleUrl: './payment-popup.scss'
})
export class PaymentPopup implements OnInit {

  upiData:string = '';
  // Card Details
  cardHolderName:string = '';
  cardNumber:string = '';
  expiry:string = '';
  cvv:string = '';

  // Net Banking
  accountHolder:string = '';
  accountNumber:string = '';
  ifsc:string = '';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PaymentPopup>, private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.upiData = `upi://pay?pa=8766968714-3@ybl&pn=Dattawakale&cu=INR`;
    this.upiData = `upi://pay?pa=8766968714-3@ybl&pn=Dattawakale&am=${this.data.amount}&cu=INR`;
  }

  submitPayment(): void {

    if (this.data.method === 'UPI') {
      this.dialogRef.close({ success: true });
      return;
    }

    if (this.data.method === 'Net Banking') {

      if (
        !this.accountHolder ||
        !this.accountNumber ||
        !this.ifsc
      ) {
        // alert('Please fill all bank details');
        this.toastr.warning("please fill out all the feilds!", "Required");
        return;
      }

    } else {

      if ( !this.cardHolderName || !this.cardNumber || !this.expiry || !this.cvv  ) {
        // 
        this.toastr.warning("please fill out all the feilds!", "Required");
        return;
      }


    }

    this.dialogRef.close({ success: true });
  }

  cancel(): void {
    this.dialogRef.close({ success: false });
  }
  
 users:any[] = JSON.parse(localStorage.getItem('users') || '[]');
 loggedInUser:any = this.users.find((u) => {
    console.log(this.loggedInUser);
    
 })
 
}