import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification-service';
@Component({
  selector: 'app-helpcenter-popup',
  standalone: true,
  imports: [ FormsModule,MatButtonModule,MatFormFieldModule, MatInputModule],
  templateUrl: './helpcenter-popup.html',
  styleUrl: './helpcenter-popup.scss'
})
export class HelpcenterPopup {

 // injected via inject method
  private dialogRef = inject(MatDialogRef<HelpcenterPopup>);
  private toastr = inject(ToastrService);
  private notification = inject(NotificationService);
  query = '';
  openFaq: number | null = null;

  faqs = [
    {
      question: 'How do I cancel a booking?',
      answer: `
        1. Go to My Bookings.
        2. Select the booking you want to cancel.
        3. Click Cancel Booking.
        4. Confirm the cancellation.
      `
    },
    {
      question: 'Payment deducted but booking not created.',
      answer: `
        If payment was deducted and no booking was created:
        1. Wait 5-10 minutes.
        2. Check My Bookings.
        3. If still not visible, contact support with the transaction ID.
      `
    },
    {
      question: 'How can I reschedule my slot?',
      answer: `
        1. Open My Bookings.
        2. Select the booking.
        3. Click Reschedule.
        4. Choose a new available slot and confirm.
      `
    },
    {
      question: 'Refund policy for cancellations',
      answer: `
        • Cancellation 24+ hours before slot: Full refund.
        • Cancellation within 24 hours: Partial refund.
        • No-show bookings are non-refundable.
      `
    }
  ];
  // open question answer when click
  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }
  // send query
  sendQuery() {
    if (!this.query.trim()) {
      return;
    }
    console.log('User Query:', this.query);
    this.toastr.success('successfully send', 'get back to you');
    this.query = '';
  }

  close() {
    this.dialogRef.close();
  }
}