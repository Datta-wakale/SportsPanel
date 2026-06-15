import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

import { Sport } from '../shared/interfaces/sport.interface';
import { Venue } from '../shared/interfaces/venue.interface';
import { SPORTS } from '../shared/constants/sports.constants';
import { VENUES } from '../shared/constants/venues.contstants';

@Component({
  selector: 'app-list-of-sports',
  imports: [ RouterLink, ReactiveFormsModule],
  templateUrl: './listofsports.html',
  styleUrl: './listofsports.scss'
})
export class ListOfSportsComponent implements OnInit {
 //  data for sports and venues
  sports: Sport[] = SPORTS;
  venues: Venue[] = VENUES;
  filteredSports: Sport[] = [...this.sports];
  filteredVenues: Venue[] = [...this.venues];
  searchControl = new FormControl('');
  // on component load
  ngOnInit(): void {
    // Listen to search input changes
    this.searchControl.valueChanges
       /* .pipe(
         debounceTime(300),
        distinctUntilChanged() 
      )  */
      // Subscribe to search input changes
      .subscribe(value => {
        const searchValue = value?.toLowerCase().trim() || '';
        // Empty input
        if (!searchValue) {
          this.filteredSports = [...this.sports];
          this.filteredVenues = [...this.venues];
          return;
        }
        // Filter sports
        this.filteredSports = this.sports.filter(
          sport =>
            sport.name
              .toLowerCase()
              .includes(searchValue)
        );
        // Find exact sport
       const matchingSports = this.sports.filter(
  sport =>
    sport.name
      .toLowerCase()
      .includes(searchValue)
);

if (matchingSports.length > 0) {

  const sportIds = matchingSports.map(
    sport => sport.id
  );

  this.filteredVenues = this.venues.filter(
    venue =>
      sportIds.includes(venue.sportId)
  );

}

else {

  this.filteredVenues = [];

}
      });
  }
}