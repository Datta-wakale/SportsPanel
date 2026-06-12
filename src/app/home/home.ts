import { Component} from '@angular/core';
import { RouterLink } from "@angular/router";
import { NotificationService } from '../services/notification-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // inject notification service
  constructor(private notificationService: NotificationService, private router: Router) {}
  // logout function
  logout(): void {
    // clear localStorage
    localStorage.removeItem('loggedInUser');
    //set toast for logout
    this.notificationService.setToast('info', 'Logged Out', 'You have been successfully logged out.');  
  }
}
