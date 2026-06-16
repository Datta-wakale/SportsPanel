import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserDelete } from '../../user-delete/user-delete';
import { VENUES } from '../../shared/constants/venues.contstants';
import { Venue } from '../../shared/interfaces/venue.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-venues',
  imports: [ CommonModule,FormsModule,RouterLink,MatDialogModule],
  templateUrl: './manage-venues.html',
  styleUrl: './manage-venues.scss'
})
export class ManageVenuesComponent {
  
  toastr = inject(ToastrService);
  dialouge = inject(MatDialog);

  venues: Venue[] = [...VENUES];
  newVenue: Venue = {
    id: 0,
    sportId: 1,
    name: '',
    location: '',
    price: 0,
    image: ''

  };
  // Add a new venue to the list
  addVenue(): void {

    const venue: Venue = {
      
      ...this.newVenue,
      id: this.venues.length + 1
    };
    
    // Add the new venue to the venues array
    this.venues.push(venue);
    this.newVenue = {
      id: 0,
      sportId: 1,
      name: '',
      location: '',
      price: 0,
      image: ''
    };
  }
  // Delete a venue by ID
  deleteVenue(id: number): void {

  const dialogRef = this.dialouge.open(UserDelete, {
    width: '350px',
    disableClose: true,
    data: {
      title: 'Delete Venue',
      message: 'Are you sure you want to delete this Venue?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {   // User clicked Yes

      this.venues = this.venues.filter(
        venue => venue.id !== id
      );

      this.toastr.success("Venue deleted successfully", "Delete Venue" );

    }
  });

}
  onClick():void{
    console.log("Butoon clicked");
    
  }
}