// headerpart.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Auth } from '../services/auth';
import { User } from '../shared/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-headerpart',
  imports: [RouterLink, CommonModule],
  templateUrl: './headerpart.html',
  styleUrl: './headerpart.scss',
})
export class Headerpart implements OnInit {

  user: User | null = null;
  // injected
  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private authService = inject(Auth);

  // on component load
  ngOnInit(): void {

    // Initial load
    this.refreshUser();

    // Update user and show toast on every route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.refreshUser();
        // Check if there's a toast to display
        const toast = this.notificationService.toastData;
        // check toast is there or not
        if (toast) {
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
          //  dont repeat toast when refresh
          this.notificationService.clearToast();
        }
      });
  }

  refreshUser(): void {
    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();

    // Optional: show logout toast
    this.notificationService.setToast(
      'info',
      'Logged Out',
      'You have been logged out successfully'
    );

    this.refreshUser();
    this.router.navigate(['/home']);
    
  }

}