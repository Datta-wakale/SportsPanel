import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.scss'
})
export class ManageBookings implements OnInit {

  bookings: any[] = [];

  ngOnInit(): void {

    this.loadBookings();

  }

  loadBookings(): void {

    this.bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

  }

  cancelBooking(id: number): void {

    const booking = this.bookings.find(
      b => b.id === id
    );

    if (booking) {

      booking.status = 'Cancelled';

      localStorage.setItem(
        'bookings',
        JSON.stringify(this.bookings)
      );

    }

  }

  completeBooking(id: number): void {

    const booking = this.bookings.find(
      b => b.id === id
    );

    if (booking) {

      booking.status = 'Completed';

      localStorage.setItem(
        'bookings',
        JSON.stringify(this.bookings)
      );

    }

  }

}