import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faTrophy, faMedal, faStar, faCrown, faFire} from '@fortawesome/free-solid-svg-icons';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-profile',
  imports: [ CommonModule,RouterLink, FontAwesomeModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  // dependecies injecting via constructor
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  // fa icons of fontawesome
  faUser = faUser;
  faTrophy = faTrophy;
  faMedal = faMedal;
  faStar = faStar;
  faCrown = faCrown;
  faFire = faFire;

  // signal state
  user = signal<any>(null);
  isEditMode = signal(false);
  sports = signal<any[]>([
    { name: 'Cricket', bookings: 0 },
    { name: 'Football', bookings: 0 },
    { name: 'Badminton', bookings: 0 },
    { name: 'Turf', bookings: 0 }
  ]);
  totalBookings = signal(0);
  achievements = signal<any[]>([]);
  // most number of times booked sport
  favoriteSport = computed(() => {
    const sports = this.sports();
    const max = sports.reduce((a, b) =>
      a.bookings > b.bookings ? a : b
    );
    return max.bookings > 0 ? max.name : 'No Favorite Sport Yet';
  });
  // how many sports are present
  activeSports = computed(() =>
    this.sports().filter(s => s.bookings > 0).length
  );
// form
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    email: new FormControl({ value: '', disabled: true }),
    password: new FormControl({ value: '', disabled: true })
  });
  // INIT
  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}'); // stored user
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]'); //all bookings
    const userBookings = allBookings.filter(
      (b: any) => b.userEmail === storedUser.email
    );
    this.user.set(storedUser);
    this.totalBookings.set(userBookings.length);
    const updatedSports = this.sports().map(s => ({
      ...s,
      bookings: userBookings.filter(
        (b: any) =>
          b.sportName?.trim().toLowerCase() === s.name.toLowerCase()
      ).length
    }));
    this.sports.set(updatedSports);
    this.loadAchievements(); // call loadAchievements function
  }
  // provide badges based on how many bookings a user have
  loadAchievements(): void {
    const total = this.totalBookings();
    const sports = this.sports();
    const list: any[] = [];
    if (total >= 5) {
      // push values in achievements array
      list.push({
        title: 'Booking Enthusiast',
        class: 'bronze',
        icon: faMedal
      });
    }

    if (total >= 10) {
      list.push({
        title: 'Regular Player',
        class: 'silver',
        icon: faStar
      });
    }

    if (total >= 25) {
      list.push({
        title: 'Champion',
        class: 'gold',
        icon: faCrown
      });
    }

    const active = sports.filter(s => s.bookings > 0).length;
    if (active >= 3) {
      list.push({
        title: 'Multi-Sport Player',
        class: 'multi',
        icon: faFire
      });
    }
    this.achievements.set(list);
  }
   // NAVIGATION
  goToBookings(): void {
    this.router.navigate(['/mybookings']);
  }
  // EDIT MODE
  openEditProfile(): void {
    this.isEditMode.set(true);
    const u = this.user();
    this.updateForm.patchValue({
      name: u.name,
      phone: u.phone,
      email: u.email,
      password: u.password
    });
  }
// close edit profile when click on cancel button
  closeEdit(): void {
    this.isEditMode.set(false);
  }
// UPDATE PROFILE
  updateProfile(): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Confirm Update',
        message: 'Are you sure you want to update your information?'
      }
    });
  // after dialog box closed
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const current = this.user();
      const index = users.findIndex((u: any) => u.email === current.email);
      if (index === -1) return;
      const updatedUser = {
        ...users[index],
        ...this.updateForm.getRawValue()
      };
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      this.user.set(updatedUser);
      this.isEditMode.set(false);
    });
  }
}