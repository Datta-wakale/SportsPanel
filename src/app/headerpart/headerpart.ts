import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { Auth } from '../services/auth';
import { NotificationService } from '../services/notification-service';
import { LogoutConfirmDialog } from '../logout-confirm/logout-confirm';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-headerpart',
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './headerpart.html',
  styleUrl: './headerpart.scss'
})
export class Headerpart implements OnInit {

  faUser = faCircleUser;
  showDropdown = false;

  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private authService = inject(Auth);
  private dialog = inject(MatDialog);

  // Signals from Auth service
  user = this.authService.user;
  isAdmin = this.authService.isAdmin;

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        this.showDropdown = false;

        const toast = this.notificationService.toastData;

        if (!toast) return;

        switch (toast.type) {

          case 'success':
            this.toastr.success(
              toast.message,
              toast.title
            );
            break;

          case 'error':
            this.toastr.error(
              toast.message,
              toast.title
            );
            break;

          case 'warning':
            this.toastr.warning(
              toast.message,
              toast.title
            );
            break;

          case 'info':
            this.toastr.info(
              toast.message,
              toast.title
            );
            break;

        }

        this.notificationService.clearToast();

      });

  }

  toggleDropdown(): void {

    this.showDropdown = !this.showDropdown;

  }

  logout(): void {

    const dialogRef = this.dialog.open(
      LogoutConfirmDialog,
      {
        width: '350px',
        disableClose: true
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (!result) return;

        this.notificationService.setToast(
          'info',
          'Logged Out',
          'You have been logged out successfully'
        );

        this.showDropdown = false;

        this.authService.logout();

        this.router.navigate(
          ['/home'],
          {
            replaceUrl: true
          }
        );

      });

  }

}