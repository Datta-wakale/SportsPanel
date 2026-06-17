import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../services/auth';
import { User } from '../shared/interfaces/user.interface';
import { HelpcenterPopup } from '../helpcenter-popup/helpcenter-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footerpart',
  imports: [RouterLink,FontAwesomeModule],
  templateUrl: './footerpart.html',
  styleUrl: './footerpart.scss'
})
export class Footerpart {

  constructor(
    private authService: Auth,
    private dialog: MatDialog
  ) {}
  //get the icons and store to bind into html
  faFacebook = faFacebook;
  faXTwitter = faXTwitter;
  faInstagram = faInstagram;
  // get the user 
  get user(): User | null {
    return this.authService.getUser();
  }
  get isAdmin(): boolean {
  return this.authService.isAdminLoggedIn();
}
  // when click on help center open helpCenter box 
  openHelpCenter(){
    this.dialog.open(HelpcenterPopup, {
        width: '500px',
        height: '400px',
        disableClose: true
    });
  } 
}