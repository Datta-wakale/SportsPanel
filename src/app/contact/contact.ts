import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactInfo = {
    company: 'SportZone Arena',
    address: '123 Sports Street, Playtown, XY 45678',
    phone: '+91 8766948714',
    email: 'support@sportzone.com',
    hours: 'Mon - Sat: 6:30 AM - 4:30 PM'
  };

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸' }
  ];
}