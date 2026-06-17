import { Injectable, signal } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly storageKey = 'loggedInUser';
  private readonly adminKey = 'adminLoggedIn';

  // Signals
  user = signal<User | null>(this.loadUser());
  isAdmin = signal(this.loadAdmin());

  private loadUser(): User | null {

    const data = localStorage.getItem(this.storageKey);

    return data
      ? JSON.parse(data)
      : null;

  }

  private loadAdmin(): boolean {

    return localStorage.getItem(this.adminKey) === 'true';

  }

  // USER LOGIN
  login(user: User): void {

    localStorage.removeItem(this.adminKey);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(user)
    );

    this.user.set(user);
    this.isAdmin.set(false);

  }

  // ADMIN LOGIN
  adminLogin(): void {

    localStorage.removeItem(this.storageKey);

    localStorage.setItem(
      this.adminKey,
      'true'
    );

    this.user.set(null);
    this.isAdmin.set(true);

  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.adminKey);

    this.user.set(null);
    this.isAdmin.set(false);

  }

  // Optional helper
  isLoggedIn(): boolean {

    return this.user() !== null || this.isAdmin();

  }

}