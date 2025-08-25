import { bootstrapApplication } from '@angular/platform-browser';
import "@fontsource/inclusive-sans";      // carga el peso 400 por defecto
import "@fontsource/inclusive-sans/300.css";  // peso 300
import "@fontsource/inclusive-sans/400-italic.css"; // itálica peso 400
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
