import { Component } from '@angular/core';

import { SPORTS } from '../../shared/constants/sports.constants';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-sport-selection',
  imports:[],
  templateUrl: './sport-selection.html',
  styleUrl: './sport-selection.scss'
})
export class SportSelection {
  // data for sports
  sports = SPORTS;
  // inject booking service
  constructor(private bookingService: BookingService) {}
  // select sport and move to next step
  selectSport(sport: any): void {
    this.bookingService.selectedSport = sport;
    this.bookingService.setStep(2);
  }
}