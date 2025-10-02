import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from "../weather/weather.component";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [CommonModule, WeatherComponent, CalendarComponent]
})
export class HeaderComponent implements OnInit, OnDestroy {
  logueado = false;
  usuarioNombre = '';
  private sub!: Subscription;

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.loginService.getUsuarioObservable().subscribe(usuario => {
      this.logueado = !!usuario;
      this.usuarioNombre = usuario?.nombre || '';
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
