import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.scss'
})
export class ManageBookings implements OnInit {
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
    const booking = this.bookings.find(
      b => b.id === id
    );
    // check booking
    if (booking) {
      booking.status = 'Cancelled';
      localStorage.setItem( 'bookings',JSON.stringify(this.bookings) );
    }
  }
  // Complete a booking by ID
  completeBooking(id: number): void {
    const booking = this.bookings.find(
      b => b.id === id
    );
  
    if (booking) {
      booking.status = 'Completed';
      localStorage.setItem( 'bookings', JSON.stringify(this.bookings) );
    }
  }
}