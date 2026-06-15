import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VENUES } from '../../shared/constants/venues.contstants';
import { Venue } from '../../shared/interfaces/venue.interface';

@Component({
  selector: 'app-manage-venues',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './manage-venues.html',
  styleUrl: './manage-venues.scss'
})
export class ManageVenuesComponent {

  venues: Venue[] = [...VENUES];

  newVenue: Venue = {

    id: 0,
    sportId: 1,
    name: '',
    location: '',
    price: 0,
    image: ''

  };

  addVenue(): void {

    const venue: Venue = {

      ...this.newVenue,

      id: this.venues.length + 1

    };

    this.venues.push(venue);

    this.newVenue = {

      id: 0,
      sportId: 1,
      name: '',
      location: '',
      price: 0,
      image: ''

    };

  }

  deleteVenue(id: number): void {

    this.venues = this.venues.filter(
      venue => venue.id !== id
    );

  }

}