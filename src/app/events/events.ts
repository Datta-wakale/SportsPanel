import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventsPopup } from '../events-popup/events-popup';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class EventsComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog, private authService : Auth) {}
  // boolean flag for toggling button
  isLogin:boolean = false;

  // store url of images
  images: string[] = [
    'images/football.avif',
    'images/cricket.jpg',
    'images/badminton.avif',
    'images/turf.jpg'
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {

  this.startSlider();

 const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  console.log(user); 
  this.isLogin = !!user;  

}
  
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 2000);
  }

  nextSlide(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) %
      this.images.length;
  }
// upcomings events
  upcomingEvents: any[] = [
    {
      title: 'Cricket Championship',
      date: '20 JUN 2026',
      location: 'Hyderabad',
      description: 'Inter-state cricket tournament.'
    },
    {
      title: 'Football League',
      date: '12 Aug 2026',
      location: 'Pune',
      description: 'Top football teams competing.'
    },
    {
      title: 'Badminton League',
      date: '03 DEC 2026',
      location: 'Mumbai',
      description: 'Singles and doubles categories.'
    }
  ];

  // Event Registration
  eventRegisteration(event: any): void {
  // get the user from localStorage 
  const user = JSON.parse( localStorage.getItem('loggedInUser') || '{}' );
  console.log(user);
  const dialogRef = this.dialog.open(EventsPopup, {
    width: '500px',
    disableClose: true,
    data: {
      event,
      user
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result?.success) {

      const registrations = JSON.parse(
        localStorage.getItem('eventRegistrations') || '[]'
      );

      registrations.push({
        id: Date.now(),
        userEmail: user.email,
        eventName: event.title,
        location: event.location,
        date: event.date,
        teamName: result.teamName,
        numberOfPlayers: result.numberOfPlayers,
        contactPerson: result.contactPerson,
        mobile: result.mobile,
        amount: 999,
        paymentStatus: 'Paid'
      });
      // set in localStorage
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations)
      );

      console.log('Registration Saved');
    }
  });
  
}
}