import { Component, input, effect, output} from '@angular/core';

import { SPORTS } from '../../shared/constants/sports.constants';
import { BookingService } from '../../services/booking.service';
import { Sport } from '../../shared/interfaces/sport.interface';

@Component({
  selector: 'app-sport-selection',
  imports:[],
  templateUrl: './sport-selection.html',
  styleUrl: './sport-selection.scss'
})
export class SportSelection {

  // user = input<any>(null);
user = input<any>(null);
  // data for sports
  sports = SPORTS;
  // inject booking service
  constructor(private bookingService: BookingService) {
    effect(() => {
    console.log('User:', this.user());
  });
  }
  // select sport and move to next step
  /* selectSport(sport: any): void {
    this.bookingService.selectedSport = sport;
    this.bookingService.setStep(2);
  
  } */
 sportSelected = output<any>();

 selectSport(sport : Sport): void{
    this.sportSelected.emit(sport);
 }

}