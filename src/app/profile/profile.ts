import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  totalBookings = 0;
  favoriteSport = 'No Bookings Yet';

  sports = [
    { name: 'Cricket', bookings: 0 },
    { name: 'Football', bookings: 0 },
    { name: 'Badminton', bookings: 0 },
    { name: 'Turf', bookings: 0 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.user = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    const allBookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    const userBookings = allBookings.filter(
      (booking: any) =>
        booking.userEmail === this.user.email
    );

    this.totalBookings = userBookings.length;

    this.sports.forEach(sport => {
      sport.bookings = userBookings.filter(
        (booking: any) =>
          booking.sportName?.trim().toLowerCase() ===
          sport.name.trim().toLowerCase()
      ).length;
    });

    const maxSport = this.sports.reduce((a, b) =>
      a.bookings > b.bookings ? a : b
    );

    this.favoriteSport =
      maxSport.bookings > 0
        ? maxSport.name
        : 'No Bookings Yet';
  }

  goToBookings(): void {
    this.router.navigate(['/mybookings']);
  }

}