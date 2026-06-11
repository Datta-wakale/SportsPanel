import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
 
  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep = this.currentStepSubject.asObservable();
  selectedSport: any = null;
  selectedVenue: any = null;
  selectedSlot: any = null;
  selectedPayment: any = null;

  setStep( step: number): void {
    this.currentStepSubject.next(step);
  }
}