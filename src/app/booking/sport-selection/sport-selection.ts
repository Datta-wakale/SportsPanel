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
  sports = SPORTS;

  constructor(private bookingService: BookingService) {}

  selectSport(sport: any): void {
    this.bookingService.selectedSport = sport;
    this.bookingService.setStep(2);
  }
}