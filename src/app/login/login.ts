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
  // onLogin
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill out all fields correctly.', 'Validation Error');
      return;
    }

    const { email, password } = this.loginForm.value;

    // SAME ENCRYPTION AS REGISTER
    const encryptedPassword = password
      .split('')
      .map((char: string) => char.charCodeAt(0))
      .join('-');
    // retrieve the users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // find the user
    const user = users.find(
      (u: any) => u.email === email && u.password === encryptedPassword   
    );

  if(user){
      this.authService.login(user);
      this.notificationService.setToast('success',
        'Login Successful',
        'Welcome back to the portal!');
      // Trigger success toast
 /*      this.toastr.success('Welcome back to the portal!', 'Login Successful')
      // Wait for 2 seconds
        // setTimeout(() => {
         
        // }, 2000); */
        this.router.navigate(['/booking']);
    } else {
      // Trigger error toast for invalid inputs
     this.toastr.error('Invalid email or password. Please try again.', 'Login Failed');
    }
  }
  openForgotPassword(): void {
  this.dialog.open(LoginpopupComponent, {
    width: '450px',
    disableClose : true
  });
} 
}


