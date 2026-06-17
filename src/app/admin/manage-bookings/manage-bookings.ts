import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookingConfirmDialog } from '../../manage-bookings-dialouge/manage-bookings-dialouge';
@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule, RouterLink, MatDialogModule],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.scss'
})
export class ManageBookings implements OnInit {
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  //  bookings data
  bookings = signal<any[]>([]);
  // on component init, load bookings
  ngOnInit(): void {
    // Load bookings from localStorage
    this.loadBookings();
  }
  loadBookings(): void {
    const data = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.bookings.set(data);
  }
  // Cancel a booking by ID
  cancelBooking(id: number): void {
    const booking = this.bookings().find(
      b => b.id === id
    );

    if (!booking || booking.status !== 'Upcoming') {
      return;
    }
    const dialogRef = this.dialog.open(BookingConfirmDialog, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Cancel Booking',
        message: 'Are you sure you want to cancel this booking?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookings.update(bookings =>
          bookings.map(b =>
            b.id === id
              ? {
                ...b,
                status: 'Cancelled'
              }
              : b
          )
        );
        // store the bookings
        localStorage.setItem('bookings', JSON.stringify(this.bookings()));
        this.toastr.warning('Booking cancelled successfully', 'Cancel Booking');
      }
    });
  }
}