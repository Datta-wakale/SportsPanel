import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VENUES } from '../../shared/constants/venues.contstants';
import { Venue } from '../../shared/interfaces/venue.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-venues',
  imports: [ CommonModule,FormsModule,RouterLink],
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
  // Add a new venue to the list
  addVenue(): void {
    const venue: Venue = {
      ...this.newVenue,
      id: this.venues.length + 1
    };
    // Add the new venue to the venues array
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
  // Delete a venue by ID
  deleteVenue(id: number): void {
    this.venues = this.venues.filter(
      venue => venue.id !== id
    );
  }
  onClick():void{
    console.log("Butoon clicked");
    
  }
}