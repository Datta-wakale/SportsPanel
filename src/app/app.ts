import { Component, OnInit, signal } from '@angular/core';
import { Headerpart } from "./headerpart/headerpart";
 import { RouterOutlet } from '@angular/router';
import { Footerpart } from "./footerpart/footerpart";

@Component({
  selector: 'app-root',
  imports: [Headerpart, RouterOutlet, Footerpart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  
})
export class App {
  protected readonly title = signal('sportsportal');

  ngOnInit(): void {
    const admin = localStorage.getItem('admin');
    if(!admin){
      const encryptedpass = 'admin123'
      .split('').map(char => char.charCodeAt(0))
      .join('-')

      localStorage.setItem('admin',JSON.stringify({
      email: 'admin@gmail.com',
      password: encryptedpass
    }))
    }
  }
}