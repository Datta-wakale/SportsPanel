import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserDelete } from '../../user-delete/user-delete';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatDialogModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss'
})
export class ManageUsersComponent  {
  // injecting dependencies via constructor
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);
  //Form Array
  usersForm: FormArray = this.fb.array<FormGroup>([]);

  // load the user loading component
  ngOnInit(): void {
    // call load users
    this.loadUsers();
  }
  // SAFE getter for template
  get users(): FormGroup[] {
    // get values as a FormGroup
    return this.usersForm.controls as FormGroup[];
  }
  // LOAD users function
  loadUsers(): void {
    // get the users form localStorage if not present return empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.usersForm.clear();
    // push values of form as a formGroup in FormArray
    users.forEach((u: any) => {
      this.usersForm.push(
        this.fb.group({
          name: [u.name],
          email: [u.email],
          phone: [u.phone],
          isEditing: [false]
        })
      );
    });
  }

  //  edit the user based on Index
 editUser(index: number): void {
  const dialogRef = this.dialog.open(UserDelete, {
    width: '350px',
    disableClose: true,
    data: {
      title: 'Edit User',
      message: 'Do you want to edit this user?'
    }
  });

 dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this.usersForm.at(index).patchValue({ isEditing: true });
    this.cdr.detectChanges();
  }
});
}
  // SAVE
  saveUser(index: number): void {
    const group = this.usersForm.at(index);
    group.patchValue({ isEditing: false });
    localStorage.setItem( 'users', JSON.stringify(
        this.usersForm.value.map((u: any) => ({
          name: u.name,
          email: u.email,
          phone: u.phone,
        
        }))
      )
    );

    this.toastr.success('User updated', 'Success');
  }

  // DELETE user based on index
  deleteUser(index: number): void {

    const dialogRef = this.dialog.open(UserDelete, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Delete User',
       message : 'are you sure you want to delete this user'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // remove user at selected index
        this.usersForm.removeAt(index);
        localStorage.setItem( 'users', JSON.stringify(
            this.usersForm.value.map((u: any) => ({
              name: u.name,
              email: u.email,
              phone: u.phone
            }))
          )
        );
        this.toastr.success('User deleted', 'Success'); // show toastr notifications
      }
    });
  }
}
