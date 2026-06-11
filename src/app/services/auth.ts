import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  private storageKey = 'loggedInUser';

  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loginStatus = this.loginStatusSubject.asObservable();

  // GET USER
  getUser(): User | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // LOGIN
  login(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.loginStatusSubject.next(true); // Update login status
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.loginStatusSubject.next(false); // Update login status
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}