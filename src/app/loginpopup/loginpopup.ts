import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-loginpopup',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './loginpopup.html',
  styleUrls: ['./loginpopup.scss']
})
export class LoginpopupComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private dialogRef = inject(MatDialogRef<LoginpopupComponent>);
  step = 1;
  currentEmail = '';
  // Display OTP in popup
  generatedOtp = '';
// form group
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    otp: [''],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]]
  });

  generateOtp(): string {
    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  }

  next(): void {
    //  - VERIFY EMAIL
  if (this.step === 1) {
    const email = this.form.get('email')?.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // get admin from the localStorage
    const admin = JSON.parse( localStorage.getItem('admin') || '{}');

    const user = users.find(
      (u: any) => u.email === email
    );

    const isAdmin = admin.email === email;

    if (!user && !isAdmin) {
      this.toastr.error( 'Email not found',  'Error');
      return;
    }
    const otp = this.generateOtp();
    const otpStore = JSON.parse( localStorage.getItem('otpStore') || '{}' );
    otpStore[email] = {code: otp, expires: Date.now() + 200000};
    localStorage.setItem( 'otpStore',  JSON.stringify(otpStore) );
    this.currentEmail = email;
    this.generatedOtp = otp;
    this.step = 2;
    return;
  }

  // STEP 2 ...
    // STEP 2 - VERIFY OTP
    if (this.step === 2) {
      const enteredOtp = this.form.get('otp')?.value;
      const otpStore = JSON.parse(localStorage.getItem('otpStore') || '{}' );
      const otpData = otpStore[this.currentEmail];
      if (!otpData) {
        this.toastr.error('OTP not found');
        return;
      }
      if (Date.now() > otpData.expires) {
        this.toastr.error('OTP expired');
        return;
      }
      if (otpData.code !== enteredOtp) {
        this.toastr.error('Invalid OTP');
        return;
      }
      this.step = 3;
      return;
    }
    // STEP 3 - RESET PASSWORD
 if (this.step === 3) {

  const password = this.form.get('password')?.value;
  const confirmPassword = this.form.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    this.toastr.error('Please enter password fields');
    return;
  }

  if (password !== confirmPassword) {
    this.toastr.error('Passwords do not match');
    return;
  }

  const encryptedPassword = password
    .split('')
    .map((char: string) => char.charCodeAt(0))
    .join('-');

  const admin = JSON.parse(
    localStorage.getItem('admin') || '{}'
  );
  // ADMIN PASSWORD RESET
  if (admin.email === this.currentEmail) {
    admin.password = encryptedPassword;
    localStorage.setItem('admin',JSON.stringify(admin));
    // remove OTP
    const otpStore = JSON.parse( localStorage.getItem('otpStore') || '{}');
    delete otpStore[this.currentEmail];
    localStorage.setItem('otpStore',JSON.stringify(otpStore));
    this.toastr.success('Admin Password Updated Successfully');
    this.dialogRef.close();
    return;
  }

  // USER PASSWORD RESET
  const users = JSON.parse( localStorage.getItem('users') || '[]'); 
  const userIndex = users.findIndex(
    (u: any) => u.email === this.currentEmail
  );

  if (userIndex === -1) {
    this.toastr.error('User not found');
    return;
  }
  users[userIndex].password = encryptedPassword;
  localStorage.setItem( 'users',JSON.stringify(users));
  // remove OTP
  const otpStore = JSON.parse(localStorage.getItem('otpStore') || '{}');
  delete otpStore[this.currentEmail];
  localStorage.setItem('otpStore',JSON.stringify(otpStore) );
  this.toastr.success( 'Password Updated Successfully' );
  this.dialogRef.close();
  return;
}
}
  close(): void {
    this.dialogRef.close();
  }
}