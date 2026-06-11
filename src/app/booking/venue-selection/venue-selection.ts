import { Component } from '@angular/core';

import { BookingService } from '../../services/booking.service';
import { VENUES } from '../../shared/constants/venues.contstants';

@Component({
  selector: 'app-venue-selection',
  standalone: true,
  templateUrl: './venue-selection.html',
  styleUrl: './venue-selection.scss'
})
export class VenueSelection {

  constructor(public bookingService: BookingService) {}

  get venues() {
    return VENUES.filter(
      venue => venue.sportId === this.bookingService.selectedSport.id
    );
  }

  selectVenue(venue: any): void {
    this.bookingService.selectedVenue = venue;
    this.bookingService.currentStep = 3;
  }
}