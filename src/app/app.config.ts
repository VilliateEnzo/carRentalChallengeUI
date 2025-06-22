import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './application/interceptors/jwt.interceptor';
import { provideToastr } from 'ngx-toastr';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    importProvidersFrom(FlexLayoutServerModule),
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    })
  ]
};
