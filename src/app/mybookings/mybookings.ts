import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VENUES } from '../shared/constants/venues.contstants';
@Component({
  selector: 'appmybookings',
  imports: [CommonModule,RouterLink],
  templateUrl: './mybookings.html',
  styleUrl: './mybookings.scss'
})
export class MyBookings implements OnInit {
  // empty array to store bookings
  upcomingBookings:any[] = [];
  historyBookings:any[] = [];

  ngOnInit(): void {
    // get the loggedInUser from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}' );
    // retrieve the booking from the localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = allBookings.filter(  (b:any) => b.userEmail === user.email );
    // iterate over booking and filter out
    this.upcomingBookings = userBookings.filter((b:any) => b.status === 'Upcoming');
    // filter the booking
    this.historyBookings = userBookings.filter(
      (b:any) => b.status === 'Completed' || b.status === 'Cancelled');
  }
  // cancel booking
  cancelBooking(id:number){
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(
      (b:any) => b.id === id);
    // check booking is there or not
    if(booking){
      booking.status = 'Cancelled';
    }
    // after changes save in localStorage
    localStorage.setItem( 'bookings',JSON.stringify(bookings));
    this.ngOnInit();
  }

  //
/*   getVenueImage(venueName : string) {
      const venue: any = VENUES.find((v)=> {
        v.name === venueName;
        return venue ? venue.image : 'null'
      })
  } */
}