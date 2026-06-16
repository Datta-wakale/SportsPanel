import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss'
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

  }

  deleteUser(email: string): void {

    this.users = this.users.filter(
      user => user.email !== email
    );

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );

  }

}