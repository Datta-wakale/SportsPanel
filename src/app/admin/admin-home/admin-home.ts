import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VENUES } from '../../shared/constants/venues.contstants';
import { SPORTS } from '../../shared/constants/sports.constants';
@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss',
})
export class AdminHome implements OnInit {

  sportsCount:number = 0;
  venuesCount:number = 0;
  usersCount:number = 0;
  bookingsCount:number = 0;

  ngOnInit(): void {
    // Sports count
    this.sportsCount = SPORTS.length;

    // Venues count
    this.venuesCount = VENUES.length;

    // Users count
    this.usersCount = JSON.parse(
      localStorage.getItem('users') || '[]'
    ).length;

    // Bookings count
    this.bookingsCount = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    ).length;
  }
}
