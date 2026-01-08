import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { TemaService } from './services/tema.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'turistecz';
  isModalOpen = false;
  showBreadcrumbs = false; 
  
  //Para que, al entrar en el enlace, el scroll aparezca arriba del todo
   constructor(private router: Router
    , private temaService: TemaService
   ) { 
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event: any) => {
         this.showBreadcrumbs = !event.urlAfterRedirects.startsWith('/login') 
         && !event.urlAfterRedirects.startsWith('/signin') 
         && !event.urlAfterRedirects.startsWith('/recuperar-contrasena') 
         && event.urlAfterRedirects !== '/';

        window.scrollTo(0, 0);
      });
 }
}
