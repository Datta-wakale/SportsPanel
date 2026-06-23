import { Component, inject } from '@angular/core';
import {ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification-service';
interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);

  passwordMismatch = false;

  // Reactive Form
  registerForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]
    }),

    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]
    }),

    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),

    confirmpassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  // REGISTER SUBMIT
  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
     this.toastr.warning( 'please fill out all the feilds correctly', 'Registration Failed');
      return;
    }

    // Get form values safely
    const formValue = this.registerForm.getRawValue();

    const password = formValue.password;
    const confirmPassword = formValue.confirmpassword;

    // PASSWORD MATCH CHECK
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      this.toastr.error(
        'both password should be match',
        'Registration Failed'
      );
      return;
    }

    this.passwordMismatch = false;
    // SIMPLE ENCRYPTION
    const encryptedPassword = password
      .split('')
      .map(char => char.charCodeAt(0))
      .join('-');

    // GET USERS
    const users: User[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    // EMAIL CHECK
    const emailExists = users.some(
      user => user.email === formValue.email
    );

    if (emailExists) {
       this.toastr.error(
        'email is already registered.',
        'Registration Failed'
      );

      return;
    }

    // PHONE CHECK
    const phoneExists = users.some(
      user => user.phone === formValue.phone
    );

    if (phoneExists) {
      this.toastr.error(
        'Phone number is already registered.',
        'Registration Failed'
      );
      return;
    }

    // ADD USER
    const newUser: User = {
      name: formValue.name,
      phone: formValue.phone,
      email: formValue.email,
      password: encryptedPassword
    };

    users.push(newUser);

    // SAVE USERS
    localStorage.setItem('users', JSON.stringify(users));

    // SUCCESS TOAST
    this.toastr.success(
      'Your account has been created successfully.',
      'Registration Successful'
    );
    // RESET FORM
    this.registerForm.reset();
  }

  // ONLY NUMBERS ALLOWED
  onlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode || event.which;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}