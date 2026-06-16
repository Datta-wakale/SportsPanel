import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SPORTS } from '../../shared/constants/sports.constants';
import { Sport } from '../../shared/interfaces/sport.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-sports',
  imports: [ CommonModule, FormsModule,RouterLink],
  templateUrl: './manage-sports.html',
  styleUrl: './manage-sports.scss'
})
export class ManageSportsComponent {
  // Initialize sports with predefined data
  sports: Sport[] = [...SPORTS];

  newSport: Sport = {
    id: 0,
    name: '',
    image: ''

  };
  // Add a new sport to the list
  addSport(): void {
    const sport: Sport = {
      ...this.newSport,
      id: this.sports.length + 1
    };
    this.sports.push(sport);
    this.newSport = {
      id: 0,
      name: '',
      image: ''
    };
  }
  // Delete a sport by ID
  deleteSport(id: number): void {
    // Remove the sport with the specified ID from the sports array
    this.sports = this.sports.filter(
      sport => sport.id !== id
    );
  }
}