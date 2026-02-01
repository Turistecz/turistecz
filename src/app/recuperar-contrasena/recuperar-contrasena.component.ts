import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [FormsModule, CommonModule, BreadcrumbsComponent],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onForgotPassword() {
    this.http.post(`${environment.apiBaseUrl}/auth/forgot-password`, { email: this.email }, { responseType: 'text' }).subscribe({
      next: () => alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña"),
      error: () => alert("Error al procesar la solicitud")
    });
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}

