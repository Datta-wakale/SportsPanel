import { Injectable } from '@angular/core';
import { SPORTS } from '../shared/constants/sports.constants';
import { VENUES } from '../shared/constants/venues.contstants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getTotalSports(): number {
    return SPORTS.length;
  }

  getTotalVenues(): number {
    return VENUES.length;
  }

  getTotalUsers(): number {

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    return users.length;
  }

  getTotalBookings(): number {

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    return bookings.length;
  }

  getUpcomingBookings(): number {

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    return bookings.filter(
      (b: any) => b.status === 'Upcoming'
    ).length;

  }

  getCompletedBookings(): number {

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    return bookings.filter(
      (b: any) => b.status === 'Completed'
    ).length;

  }

  getCancelledBookings(): number {

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    return bookings.filter(
      (b: any) => b.status === 'Cancelled'
    ).length;

  }

}