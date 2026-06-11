import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),       // For API calls
    provideAnimations(),       // Required for toast transitions
    provideToastr({            // Global Toastr configuration
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 4000,           // Toast stays visible for 4 seconds
      extendedTimeOut: 1000,   // Extra 1s if hovered
      closeButton: true,       // Show close button
      progressBar: true        // Show progress bar
    })
  ]
};