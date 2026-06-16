import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private storageKey = 'loggedInUser';
  private adminKey = 'adminLoggedIn';
  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  loginStatus = this.loginStatusSubject.asObservable();

  // GET NORMAL USER
  getUser(): User | null {
    const data = localStorage.getItem( this.storageKey );
    return data ? JSON.parse(data) : null;

  }

  // USER LOGIN
  login(user: User): void {
    localStorage.setItem( this.storageKey, JSON.stringify(user));
    this.loginStatusSubject.next(true);
  }
  // ADMIN LOGIN
  adminLogin(): void {
    localStorage.setItem(this.adminKey, 'true');
    this.loginStatusSubject.next(true);
  }
  // CHECK ADMIN
  isAdminLoggedIn(): boolean {
    return localStorage.getItem( this.adminKey ) === 'true';
  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem(  this.storageKey);
    localStorage.removeItem(  this.adminKey );

    this.loginStatusSubject.next(false);

  }

  // CHECK LOGIN
  isLoggedIn(): boolean {

    return (
      this.getUser() !== null ||
      this.isAdminLoggedIn()
    );

  }

}