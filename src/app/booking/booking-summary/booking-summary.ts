import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.scss'
})
export class BookingSummary implements OnInit {

  weatherData: any = null;
  weatherMessage = '';
  temperature: number = 0;
  constructor(
    public bookingService: BookingService,
    private weatherService: WeatherService,
    private cdr : ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    console.log('Component Loaded');

    const venue = this.bookingService.selectedVenue;
    const sport = this.bookingService.selectedSport;

    console.log('Venue =>', venue);
    console.log('Sport =>', sport);

    if (!venue || !sport) {
      this.weatherMessage = 'Missing booking data';
      return;
    }
console.log('Before API Call');
    this.weatherService
      .getCurrentWeather(venue.latitude, venue.longitude)
      .subscribe({
       next: (response: any) => {
this.weatherMessage = 'cloudy mmm';
  this.weatherData = response;
    this.temperature = response.current.temperature_2m;
  const weatherCode = response.current.weather_code;
   console.log('temperature =', this.temperature);
  console.log('message =', this.weatherMessage);


  switch (weatherCode) {

    case 0:
      this.weatherMessage = `☀️ Sunny - ${this.temperature}°C`;
      break;

    case 1:
    case 2:
      this.weatherMessage = `⛅ Partly Cloudy - ${this.temperature}°C`;
      break;

    case 3:
      this.weatherMessage = `☁️ Cloudy - ${this.temperature}°C`;
      break;

    case 61:
    case 63:
    case 65:
      this.weatherMessage = `🌧️ Rainy - ${this.temperature}°C`;
      break;

    case 95:
      this.weatherMessage = `⛈️ Thunderstorm - ${this.temperature}°C`;
      break;

    default:
      this.weatherMessage = `🌤️ Weather Available - ${this.temperature}°C`;
  }
  this.cdr.detectChanges();

  console.log('Weather Message =>', this.weatherMessage);
},
        error: (err) => {

          console.error('Weather API Error =>', err);

          this.weatherMessage =
            'Unable to fetch weather information.';
        }
      });
      console.log('After Subscribe');
  }
}