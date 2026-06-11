import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { SportSelection } from './sport-selection/sport-selection';
import { VenueSelection } from './venue-selection/venue-selection';
import { SlotSelection } from './slot-selection/slot-selection';
import { BookingSummary } from './booking-summary/booking-summary';
import { PaymentSelection } from './payment-selection/payment-selection';

@Component({
  selector: 'app-booking',
  imports: [ SportSelection,VenueSelection,SlotSelection,BookingSummary,PaymentSelection,RouterLink],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking implements OnInit {
  user: any = null;
  steps: any[] = [ 'Sport', 'Venue', 'Slot', 'Summary', 'Payment'];
  currentStep:number = 1;
  constructor(
    public bookingService: BookingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Subscribe to BehaviorSubject
    this.bookingService.currentStep
      .subscribe(step => {
        this.currentStep = step;
      });

    // get loggedInUser from localStorage
    const storedUser =localStorage.getItem('loggedInUser');

    // if not there redirect to login first
    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }
    // parse the value of user
    this.user = JSON.parse(storedUser);
  }
  // logout the user
  logout(): void {
    // remove the user from localStorage
    localStorage.removeItem('loggedInUser');
    // reset step
    this.bookingService.setStep(1);
    this.router.navigate(['/home']);
  }
  // previous step
  prevStep(): void {
    if (this.currentStep > 1) {
      this.bookingService.setStep(
        this.currentStep - 1
      );

    }

  }

}