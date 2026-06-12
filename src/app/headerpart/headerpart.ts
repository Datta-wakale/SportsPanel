// headerpart.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Auth } from '../services/auth';
import { User } from '../shared/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification-service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmDialog } from '../logout-confirm/logout-confirm';
@Component({
  selector: 'app-headerpart',
  imports: [RouterLink, CommonModule],
  templateUrl: './headerpart.html',
  styleUrl: './headerpart.scss',
})
export class Headerpart implements OnInit {
  // user data
  user: User | null = null;

  // injected
  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private authService = inject(Auth);
  private dialog = inject(MatDialog);
  showDropdown = false;
  // on component load
  ngOnInit(): void {

    // Observable Logic
    this.authService.loginStatus
      .subscribe(status => {
        this.showDropdown= false;
        if (status) {
          this.user = this.authService.getUser();
        } else {
          // if logged out then clear user data
          this.user = null;
        }

      });

    // Existing Toastr Logic with Router Events
    this.router.events
    // Listen for NavigationEnd events to trigger toast display
      .pipe(filter(event => event instanceof NavigationEnd))
      // Subscribe to router events
      .subscribe(() => {
        this.showDropdown = false; // Hide dropdown on route change
        // Check if there's a toast to display
        const toast = this.notificationService.toastData;
        // Display toast if it exists
        if (toast) {
          // Show toast based on type
          switch (toast.type) {

            case 'success':
              this.toastr.success(toast.message, toast.title);
              break;

            case 'error':
              this.toastr.error(toast.message, toast.title);
              break;

            case 'warning':
              this.toastr.warning(toast.message, toast.title);
              break;

            case 'info':
              this.toastr.info(toast.message, toast.title);
              break;

          }
          // dont repeat toast when refresh
          this.notificationService.clearToast();
        }
      });

  }
  // toggle dropdown
  toggleDropdown(): void {
  // toggle the dropdown visibility
  this.showDropdown = !this.showDropdown;
}
// logout function
  logout(): void {
 // open confirmation dialog
  const dialogRef = this.dialog.open(LogoutConfirmDialog, {
    width: '350px',
    disableClose: true
  });
  // handle dialog result
  dialogRef.afterClosed().subscribe(result => {
    // if user confirmed logout
    if (result) {
      // perform logout
      this.authService.logout();
      // hide dropdown
      this.showDropdown = false;
      // show logout success toast
      this.notificationService.setToast(
        'info',
        'Logged Out',
        'You have been logged out successfully'
      );
      // navigate to home page
      this.router.navigate(['/home']);
    }

  });
}
}