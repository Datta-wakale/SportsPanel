import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { PaymentPopup } from '../../payment-popup/payment-popup';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-selection',
  imports: [MatDialogModule],
  templateUrl: './payment-selection.html',
  styleUrl: './payment-selection.scss'
})
export class PaymentSelection {

  constructor(
    public bookingService: BookingService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  payments = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'];
  pay(method: string): void {

    const dialogRef = this.dialog.open(PaymentPopup, {
      width: '450px',
      disableClose: true,
      data: {
        method,
        amount: this.bookingService.selectedVenue.price
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.confirmBooking(method);
      }
    });
  }

  confirmBooking(method: string): void {

    this.bookingService.selectedPayment = method;
    // get the loggedInUser
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}' );
    // initially it is an empty array
    const bookings = JSON.parse( localStorage.getItem('bookings') || '[]');
    // oushing array of objects into bookings array
    bookings.push({
      id: Date.now(),
      userEmail: user.email,
      sportName: this.bookingService.selectedSport.name,
      venueName: this.bookingService.selectedVenue.name,
      date: this.bookingService.selectedSlot.date,
      fromTime: this.bookingService.selectedSlot.from,
      toTime: this.bookingService.selectedSlot.to,
      amount: this.bookingService.selectedVenue.price,
      paymentMethod: method,
      status: 'Upcoming'
    });
    // save the bookings in the localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    // when booking confirmed msg
    this.toastrService.success("Payment successfull", "Transaction");
    this.router.navigate(['/mybookings']);
    this.bookingService.setStep(1);
  }
  
}