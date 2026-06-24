import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr'; // Imported Toastr
import { MatDialog } from '@angular/material/dialog';
import { LoginpopupComponent } from '../loginpopup/loginpopup';
import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // Injected services inject 
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(Auth);
  private toastr = inject(ToastrService); // Injected ToastrService
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);

  // on component load
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  // 
  onLogin(): void {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    this.toastr.warning(
      'Please fill out all fields correctly.',
      'Validation Error'
    );

    return;

  }

    const { email, password } = this.loginForm.value;

    const encryptedPassword = password
      .split('')
      .map((char: string) => char.charCodeAt(0))
      .join('-');

    // ADMIN LOGIN

    const admin = JSON.parse(
      localStorage.getItem('admin') || '{}'
    );

    if (
      email === admin.email &&
      encryptedPassword === admin.password
    ) {

  this.authService.adminLogin();
  this.toastr.success('Welcome Admin','Login Successful');
  this.router.navigate(
    ['/admin-dashboard'],
    { replaceUrl : true} // after navigating to admin-dashboard wipe out previous page
  );

  return;
}

    // NORMAL USER LOGIN
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log("Entered email:", email);
    console.log("Entered password:", password);
    console.log("Encrypted password:", encryptedPassword);
    console.log("Stored users:", users);
    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === encryptedPassword
    );

    if (user) {
      console.log(users);
      console.log(user);
      console.log(encryptedPassword);
      this.authService.login(user);
      // set Notifications for successfull user
      this.notificationService.setToast('success', 'Login Successful', 'Welcome back to the portal!');
      // route to the booking page when successfull login
      this.router.navigate(['/booking'],
        { replaceUrl: true }
      );
    }
    else {
      this.toastr.error('Invalid Email or Password', 'Invalid Credentials'); //invalid credentials
    }

  }
  // open pop up for forgetpassword
  openForgotPassword(): void {
    this.dialog.open(LoginpopupComponent, {
      width: '450px',
      disableClose: true
    });
  }

}




