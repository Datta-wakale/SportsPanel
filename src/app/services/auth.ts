import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private storageKey = 'loggedInUser';
  // GET USER
  getUser(): User | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // LOGIN
  login(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}