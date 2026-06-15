import { Component, signal } from '@angular/core';
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
}