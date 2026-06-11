import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-selection.html',
  styleUrl: './slot-selection.scss'
})
export class SlotSelection {
  // date
  selectedDate: string = '';
  // slot timings
  fromTime: string = '';
  toTime: string = '';
  
  // POPUP STATE
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' | '' = '';
  // injecting the service
  constructor(private bookingService: BookingService,
              private router : Router
  ) {}

  ngOnInit() {
    //generate the date so user can select
    const today = new Date();
    // split 
    this.selectedDate = today.toISOString().split('T')[0];
  }
  // set the specified date 
  setDate(event: any) {
    this.selectedDate = event.target.value;
  }
  // set initial time 
  setFromTime(event: any) {
    this.fromTime = event.target.value;
  }
  // set end time
  setToTime(event: any) {
    this.toTime = event.target.value;
  }

  confirmSlot() {
    if (!this.selectedDate || !this.fromTime || !this.toTime) {
      // call the show error function to show msg
      this.showError('Please select date and time');
      return;
    }

    if (this.toTime <= this.fromTime) {
      this.showError('End time must be greater than start time');
      return;
    }
    // 
    this.bookingService.selectedSlot = {
      date: this.selectedDate,
      from: this.fromTime,
      to: this.toTime
    };

    this.bookingService.setStep(4);

    this.showSuccess('Slot Selected Successfully');
  }

  //  success pop up
  showSuccess(msg: string) {
    this.popupType = 'success';
    this.popupMessage = msg;
    this.showPopup = true;
   /*  setTimeout(()=> {
      this.router.navigate(['/mybookings']);
    },3000); */
    
  }

  // error pop up
  showError(msg: string) {
    this.popupType = 'error';
    this.popupMessage = msg;
    this.showPopup = true;
  }
  // close pop
  closePopup() {
    this.showPopup = false;
  }
}
