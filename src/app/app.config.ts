import {ApplicationConfig} from "@angular/core";
import {provideHttpClient, withInterceptors, withJsonpSupport, withXsrfConfiguration} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {appHttpInterceptor} from './interceptors/app-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([appHttpInterceptor]),
      withJsonpSupport(), // Optionnel
      withXsrfConfiguration({cookieName: 'XSRF-TOKEN'}) // Protection CSRF
    ),
    provideRouter(routes)
  ]
};
