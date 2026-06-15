import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SPORTS } from '../../shared/constants/sports.constants';
import { Sport } from '../../shared/interfaces/sport.interface';

@Component({
  selector: 'app-manage-sports',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './manage-sports.html',
  styleUrl: './manage-sports.scss'
})
export class ManageSportsComponent {

  sports: Sport[] = [...SPORTS];

  newSport: Sport = {

    id: 0,
    name: '',
    image: ''

  };

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

  deleteSport(id: number): void {

    this.sports = this.sports.filter(
      sport => sport.id !== id
    );

  }

}