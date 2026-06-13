import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  // inject router
   constructor(private router: Router) {}
  // user data
  user: any = null;
  // data for bookings summary
  totalBookings = 0;
  favoriteSport = 'No Favorite Sport Yet';
  // data for sports summary
  sports = [
    { name: 'Cricket', bookings: 0 },
    { name: 'Football', bookings: 0 },
    { name: 'Badminton', bookings: 0 },
    { name: 'Turf', bookings: 0 }
  ];
  // on component load
  ngOnInit(): void {
    // get loggedInUser from localStorage
    this.user = JSON.parse( localStorage.getItem('loggedInUser') || '{}' );
    const allBookings = JSON.parse( localStorage.getItem('bookings') || '[]' );
    // filter bookings for that user
    const userBookings = allBookings.filter(
      // filter the booking for that user
      (booking: any) =>
        booking.userEmail === this.user.email
    );
    // total bookings
    this.totalBookings = userBookings.length;
    // calculate favorite sport
    this.sports.forEach(sport => {
      sport.bookings = userBookings.filter(
        (booking: any) =>
          booking.sportName?.trim().toLowerCase() ===
          sport.name.trim().toLowerCase()
      ).length;
    });
    // find sport with max bookings
    const maxSport = this.sports.reduce((a, b) =>
      a.bookings > b.bookings ? a : b
    );
    // if max bookings is 0 then show no bookings yet
    this.favoriteSport = maxSport.bookings > 0 ? maxSport.name : 'No Favorite Sport Yet';
  }
  // navigate to mybookings page
  goToBookings(): void{
     this.router.navigate(['/mybookings']);
  }

}