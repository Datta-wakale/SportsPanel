import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Sport {
  id: string;
  name: string;
  route: string;
  colorClass: string;
}

interface Venues {
  id: string;
  name: string;
  route: string;
  colorClass: string;
}

@Component({
  selector: 'app-list-of-sports',
  imports: [RouterLink, FormsModule],
  templateUrl: './listofsports.html',
  styleUrls: ['./listofsports.scss'],
})
export class ListOfSportsComponent {
  // array of objects
  sports: Sport[] = [
    { id: 'football', name: 'Football', route: '/booking', colorClass: 'football' },
    { id: 'cricket', name: 'Cricket', route: '/booking', colorClass: 'cricket' },
    { id: 'badminton', name: 'Badminton', route: '/booking', colorClass: 'badminton' },
    { id: 'tennis', name: 'Tennis', route: '/booking', colorClass: 'tennis' },
    { id: 'basketball', name: 'Basketball', route: '/booking', colorClass: 'basketball' },
    { id: 'turf', name: 'Turf Booking', route: '/sports/turf', colorClass: 'turf' }
  ];

  venues: Venues[] = [
    { id: 'madhapur', name: 'Madhapur', route: '/booking', colorClass: 'football' },
    { id: 'hi-tech', name: 'Hi-Tech', route: '/booking', colorClass: 'cricket' },
    { id: 'ameerpet', name: 'Ameerpet', route: '/booking', colorClass: 'badminton' },
    { id: 'hafisguda', name: 'Hafisguda', route: '/booking', colorClass: 'tennis' },
    { id: 'madhura-nagar', name: 'Madhura-nagar', route: '/booking', colorClass: 'basketball' },
    { id: 'begumpet', name: 'Begumpet', route: '/sports/turf', colorClass: 'turf' }
  ];

  searchSport = '';
  searchVenue = '';

  filteredSports: Sport[] = [...this.sports];
  filteredVenues: Venues[] = [...this.venues];

  sportVenueMap: Record<string, string[]> = {
    football: ['Madhapur', 'Begumpet', 'Hi-Tech'],
    cricket: ['Ameerpet', 'Madhapur'],
    badminton: ['Hafisguda', 'Begumpet'],
    tennis: ['Madhura-nagar', 'Hi-Tech'],
    basketball: ['Madhapur'],
    turf: ['Begumpet', 'Madhura-nagar']
  };
  // search sports you want to play
  searchSports() {

    const value = this.searchSport.toLowerCase().trim();

    if (!value) {
      this.filteredSports = [...this.sports];
      this.filteredVenues = [...this.venues];
      return;
    }

    this.filteredSports = this.sports.filter(
      sport => sport.name.toLowerCase().includes(value)
    );

    const selectedSport = this.sports.find(
      sport => sport.name.toLowerCase() === value
    );

    if (selectedSport) {

      const venueNames =
        this.sportVenueMap[selectedSport.id] || [];

      this.filteredVenues = this.venues.filter(
        venue => venueNames.includes(venue.name)
      );
    }
  }

  searchVenues() {

    const value = this.searchVenue.toLowerCase().trim();

    if (!value) {
      this.filteredVenues = [...this.venues];
      return;
    }

    this.filteredVenues = this.venues.filter(
      venue => venue.name.toLowerCase().includes(value)
    );
  }
}