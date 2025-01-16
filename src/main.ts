import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const baseUrl = 'https://flavorosa.com.br';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

(window as any).baseUrl = baseUrl;