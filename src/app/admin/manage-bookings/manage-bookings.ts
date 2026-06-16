import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserDelete } from '../../user-delete/user-delete';
@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule,RouterLink,MatDialogModule],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.scss'
})
export class ManageBookings implements OnInit {
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
//  bookings data
  bookings: any[] = [];
// on component init, load bookings
  ngOnInit(): void {
    // Load bookings from localStorage
    this.loadBookings();
  }
  loadBookings(): void {
    // Get bookings from localStorage, or initialize as empty array if not found
    this.bookings = JSON.parse( localStorage.getItem('bookings') || '[]');
  }
  // Cancel a booking by ID
  cancelBooking(id: number): void {

  const dialogRef = this.dialog.open(UserDelete, {
    width: '350px',
    disableClose: true,
    data: {
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      const booking = this.bookings.find(
        b => b.id === id
      );

      if (booking) {

        booking.status = 'Cancelled';

        localStorage.setItem(
          'bookings',
          JSON.stringify(this.bookings)
        );

        this.toastr.warning(
          'Booking cancelled successfully',
          'Cancel Booking'
        );
      }
    }

  });

}
  // Complete a booking by ID
  completeBooking(id: number): void {

  const dialogRef = this.dialog.open(UserDelete, {
    width: '350px',
    disableClose: true,
    data: {
      title: 'Complete Booking',
      message: 'Mark this booking as completed?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      const booking = this.bookings.find(
        b => b.id === id
      );

      if (booking) {
        booking.status = 'Completed';
        localStorage.setItem( 'bookings', JSON.stringify(this.bookings) );
        this.toastr.success('Booking completed successfully', 'Complete Booking' );
      }
    }

  });

}
}