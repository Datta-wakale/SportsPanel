import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser,faTrophy,faMedal,faStar,faCrown,faFire} from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterLink,FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  // inject router
   constructor(private router: Router) {}
   faUser = faUser;
   faTrophy = faTrophy;
   faMedal = faMedal;
   faStar = faStar;
   faCrown = faCrown;
   faFire = faFire;
  // user data
  user: any = null;
  // achievements
   achievements: any[] = [];
  // data for bookings summary
  totalBookings = 0;
  favoriteSport = 'No Favorite Sport Yet';
  // data for sports summary
  sports = [
    { name: 'Cricket', bookings: 0 },
    { name: 'Football', bookings: 0 },
    { name: 'Badminton', bookings: 0 },
    { name: 'Turf', bookings: 0 }
  ];
  // on component load
  ngOnInit(): void {
    // get loggedInUser from localStorage
    this.user = JSON.parse( localStorage.getItem('loggedInUser') || '{}' );
    const allBookings = JSON.parse( localStorage.getItem('bookings') || '[]' );
    // filter bookings for that user
    const userBookings = allBookings.filter(
      // filter the booking for that user
      (booking: any) =>
        booking.userEmail === this.user.email
    );
    // total bookings
    this.totalBookings = userBookings.length;
    // calculate favorite sport
    this.sports.forEach(sport => {
      sport.bookings = userBookings.filter(
        (booking: any) =>
          booking.sportName?.trim().toLowerCase() ===
          sport.name.trim().toLowerCase()
      ).length;
    });
    // find sport with max bookings
    const maxSport = this.sports.reduce((a, b) =>
      a.bookings > b.bookings ? a : b
    );
    // if max bookings is 0 then show no bookings yet
    this.favoriteSport = maxSport.bookings > 0 ? maxSport.name : 'No Favorite Sport Yet';
     this.loadAchievements();
  }
  loadAchievements():void {
    
    if(this.totalBookings >=5){
      this.achievements.push({
        title : "Booking Enthusiast",
        class : "bronze",
        icon : faMedal
      })
    }
     if (this.totalBookings >= 10) {
      this.achievements.push({
        title: 'Regular Player',
        class: 'silver',
        icon: faStar
      });
    }

    if (this.totalBookings >= 25) {
      this.achievements.push({
        title: 'Champion',
        class: 'gold',
        icon: faCrown
      });
    }
    const activeSports = this.sports.filter(s => s.bookings > 0).length;

      if(activeSports >= 3){
        this.achievements.push({
          title : "Multi-Sport Player",
          class : "multi",
          icon : faFire
        })
      }
  }
  // navigate to mybookings page
  goToBookings(): void{
     this.router.navigate(['/mybookings']);
  }
  isEditMode = false;

updateForm = new FormGroup({
  name: new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]),
  phone: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]{10}$/)
  ]),
  email: new FormControl({ value: '', disabled: true }),
  password: new FormControl({ value: '', disabled: true })
});

openEditProfile() {
  this.isEditMode = true;

  this.updateForm.patchValue({
    name: this.user.name,
    phone: this.user.phone,
    email: this.user.email,
    password: this.user.password 
  });
}
updateProfile(): void {
  //get users from localStorage
  const users = JSON.parse( localStorage.getItem('users') || '[]' );
  const index = users.findIndex( (u: any) => u.email === this.user.email );
  if (index === -1) return;

  users[index] = {
    ...users[index],
    ...this.updateForm.getRawValue()
  };
  // set the user in localStorage after updating
  localStorage.setItem( 'users',JSON.stringify(users));
  this.user = users[index];
  this.isEditMode = false;
}
// close the update form
closeEdit(): void{
  // change the state to close
  this.isEditMode = false;
}
}