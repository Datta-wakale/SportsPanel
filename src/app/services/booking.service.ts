import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  currentStep: number = 1;
  selectedSport: any = null;
  selectedVenue: any = null;
  selectedSlot: any = null;
  selectedPayment: any = null;
}