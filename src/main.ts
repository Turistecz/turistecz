import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent,{
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient(),
    FormsModule  
  ]
})
  .catch((err) => console.error(err));
