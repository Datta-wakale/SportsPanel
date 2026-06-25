import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { WeatherService } from '../../services/weather.service';
import { UserLocationService } from '../../services/userlocation-service';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.scss'
})
export class BookingSummary implements OnInit {

  // Message for the user 
  venueWeatherMessage = '';
  userWeatherMessage = '';
  // get location & venue
  userLocationName = '';
  venueName = '';

  constructor(
    public bookingService: BookingService,
    private weatherService: WeatherService,
    private userLocation: UserLocationService,
    private cdr: ChangeDetectorRef
  ) { }

  //  VENUE WEATHER (SPORT LOGIC)

  private getVenueWeatherMessage(
    weatherCode: number,
    sportType: string,
    temperature: number
  ): string {

    const isOutdoor = sportType === 'Outdoor';

    if (weatherCode === 0) {
      return isOutdoor
        ? `☀️ Excellent weather for outdoor play. Enjoy your game! (${temperature}°C)`
        : `☀️ Pleasant weather. Indoor game scheduled normally. (${temperature}°C)`;
    }

    if ([1, 2, 3].includes(weatherCode)) {
      return isOutdoor
        ? `⛅ Comfortable weather for outdoor sports. (${temperature}°C)`
        : `⛅ Good weather for travel. Indoor play unaffected. (${temperature}°C)`;
    }

    if ([61, 63, 65, 80, 81, 82, 91, 92].includes(weatherCode)) {
      return isOutdoor
        ? `🌧️ Rain expected. Outdoor play may be affected. Consider rescheduling. (${temperature}°C)`
        : `🌧️ Rain expected. Indoor play safe, but reach 20 min early due to traffic delays. (${temperature}°C)`;
    }

    if ([95, 96, 99].includes(weatherCode)) {
      return isOutdoor
        ? `⛈️ Thunderstorm risk is high. Outdoor play is not recommended. Consider rescheduling. (${temperature}°C)`
        : `⛈️ Thunderstorm conditions expected. Indoor play can continue, but travel disruptions are possible. (${temperature}°C)`;
    }

    return `🌤️ Weather update available. (${temperature}°C)`;
  }

  //  USER WEATHER (TRAVEL LOGIC)
  private getUserWeatherMessage(
    weatherCode: number,
    temperature: number
  ): string {
    // based on code give the message
    if (weatherCode === 0) {
      return `☀️ Clear weather near your location. Good time to travel. (${temperature}°C)`;
    }

    if ([1, 2, 3].includes(weatherCode)) {
      return `⛅ Mild weather near your location. You can travel comfortably. (${temperature}°C)`;
    }

    if ([61, 63, 65, 80, 81, 82, 91, 92].includes(weatherCode)) {
      return `🌧️ Rain expected near your location. Consider leaving early or delaying travel for safety. (${temperature}°C)`;
    }
    if ([95, 96, 99].includes(weatherCode)) {
  return `⛈️ Severe thunderstorm alert near your location. Avoid travel if possible. (${temperature}°C)`;
}
    return `🌤️ Weather update available for your location. (${temperature}°C)`;
  }

  //  MAIN FLOW
  async ngOnInit(): Promise<void> {
    const venue = this.bookingService.selectedVenue;
    const sport = this.bookingService.selectedSport;
    const selectedDate = this.bookingService.selectedSlot?.date;
    if (!venue || !sport || !selectedDate) return;
    this.venueName = this.formatVenueName(venue);
    const sportType = sport.type;

    try {

      // 1. GET USER LOCATION FIRST
      const position = await this.userLocation.getUserLocation();
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      // 2. NOW CALL LOCATION NAME (FIXED)
      this.userLocationName = await this.userLocation.getLocationName(userLat, userLon);
      // 3. WEATHER API
      this.weatherService.getWeatherForecast(userLat, userLon)
        .subscribe({
          next: (res: any) => {
            const index = res.daily.time.indexOf(selectedDate);
            if (index === -1) {
              this.userWeatherMessage =
                'Weather forecast not available for selected date.';
              return;
            }
            const code = res.daily.weather_code[index];
            const temp = Math.round(
              (
                res.daily.temperature_2m_max[index] +
                res.daily.temperature_2m_min[index]
              ) / 2
            );
            console.log('USER CODE:', code);
            this.userWeatherMessage = this.getUserWeatherMessage(code, temp);
            this.cdr.detectChanges();
          },
          error: () => {
            this.userWeatherMessage =
              'Unable to fetch user location weather.';
          }
        });

      // 4. VENUE WEATHER
      this.weatherService.getWeatherForecast(
        venue.latitude,
        venue.longitude
      ).subscribe({
        next: (res: any) => {
          const index = res.daily.time.indexOf(selectedDate);
          if (index === -1) {
            this.venueWeatherMessage =
              'Weather forecast not available for selected date.';
            return;
          }
          const code = res.daily.weather_code[index];
          const temp = Math.round(
            (
              res.daily.temperature_2m_max[index] +
              res.daily.temperature_2m_min[index]
            ) / 2
          );
          console.log('VENUE  CODE:', code);
          this.venueWeatherMessage = this.getVenueWeatherMessage(code, sportType, temp);
          // detect the changes
          this.cdr.detectChanges();
        }
      });

    } catch (err) {
      this.userWeatherMessage =
        'Location access denied. Enable location to see travel advisory.';
    }
  }
  // for venue location
  private formatVenueName(venue: any): string {
    if (!venue) return '';
    return `${venue.name} (${venue.location})`;
  }
}