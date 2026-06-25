import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  constructor() { }
  getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

    });
  }

  //user location 
  async getLocationName(lat: number, lon: number): Promise<string> {

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();

      const city = data?.address?.city || "Not avaiable";

      const area = data?.address?.suburb || "not"

      return area ? `${city}, ${area}` : city;
    } catch {
      return "your location"
    }
  }

}