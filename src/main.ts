import { bootstrapApplication } from '@angular/platform-browser';
import "@fontsource/inclusive-sans";      // carga el peso 400 por defecto
import "@fontsource/inclusive-sans/300.css";  // peso 300
import "@fontsource/inclusive-sans/400-italic.css"; // itálica peso 400


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
