import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SPORTS } from '../../shared/constants/sports.constants';
import { Sport } from '../../shared/interfaces/sport.interface';
import { RouterLink } from '@angular/router';
import { UserDelete } from '../../user-delete/user-delete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-sports',
  imports: [ CommonModule, FormsModule,RouterLink,MatDialogModule],
  templateUrl: './manage-sports.html',
  styleUrl: './manage-sports.scss'
})
export class ManageSportsComponent {
  dialoge = inject(MatDialog);
  toastr = inject(ToastrService);
  // Initialize sports with predefined data
  sports: Sport[] = [...SPORTS];

  newSport: Sport = {
    id: 0,
    name: '',
    image: ''

  };
  // Add a new sport to the list
  addSport(): void {
    const sport: Sport = {
      ...this.newSport,
      id: this.sports.length + 1
    };
    this.sports.push(sport);
    this.newSport = {
      id: 0,
      name: '',
      image: ''
    };
  }
  // Delete a sport by ID
  deleteSport(id: number): void {

  const ref = this.dialoge.open(UserDelete, {
    width: '350px',
    disableClose: true,
    data: {
      title: 'Delete Sport',
      message: 'Are you sure you want to delete this Sport?'
    }
  });

  ref.afterClosed().subscribe(result => {

    if (result) { // User clicked Delete
      // Remove the sport
      this.sports = this.sports.filter(
        sport => sport.id !== id
      );
      // Show success message
      this.toastr.success( "Sport deleted successfully", "Delete Sport");
    }
  });
}
}