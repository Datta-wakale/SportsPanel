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
  private readonly ADMIN_EMAIL =
  'admin@gmail.com';

private readonly ADMIN_PASSWORD =
  'admin123';
  // on component load
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  // onLogin
  onLogin(): void {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    this.toastr.warning(
      'Please fill out all fields correctly.',
      'Validation Error'
    );

    return;

  }

  const { email, password } =
    this.loginForm.value;

  // ADMIN LOGIN

  if (
    email === this.ADMIN_EMAIL &&
    password === this.ADMIN_PASSWORD
  ) {

    this.authService.adminLogin();

    this.toastr.success(
      'Welcome Admin',
      'Login Successful'
    );

    this.router.navigate(
      ['/admin-dashboard']
    );

    return;

  }

  // NORMAL USER LOGIN

  const encryptedPassword = password
    .split('')
    .map(
      (char: string) =>
        char.charCodeAt(0)
    )
    .join('-');

  const users = JSON.parse(
    localStorage.getItem(
      'users'
    ) || '[]'
  );

  const user = users.find(
    (u: any) =>
      u.email === email &&
      u.password === encryptedPassword
  );

  if (user) {

    this.authService.login(user);

    this.notificationService.setToast(
      'success',
      'Login Successful',
      'Welcome back to the portal!'
    );

    this.router.navigate(
      ['/booking']
    );

  }

  else {

    this.toastr.error(
      'Invalid email or password.',
      'Login Failed'
    );

  }

}
  openForgotPassword(): void {
  this.dialog.open(LoginpopupComponent, {
    width: '450px',
    disableClose : true
  });
} 
}


