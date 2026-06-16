import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserDelete } from '../../user-delete/user-delete';
import { NotificationService } from '../../services/notification-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-users',
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule
  ],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss'
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

  }

  deleteUser(email: string): void {

    const dialogRef = this.dialog.open(UserDelete, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.users = this.users.filter( user => user.email !== email);
        localStorage.setItem( 'users', JSON.stringify(this.users));
        this.toastr.success("user Delete", "User Deleted successfully");
      }
    });

  }

}