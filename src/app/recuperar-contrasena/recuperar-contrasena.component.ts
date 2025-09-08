import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  onForgotPassword() {
    this.http.post('/api/auth/forgot-password', { email: this.email }).subscribe({
      next: () => alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña"),
      error: () => alert("Error al procesar la solicitud")
    });
  }



}
