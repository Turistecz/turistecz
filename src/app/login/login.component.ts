import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  // 🔹 Login
  email: string = '';
  contrasena: string = ''; // 👈 nombre igual al backend (no "password")

  // 🔹 Recuperación de contraseña
  mostrarRecuperacion: boolean = false;
  forgotEmail: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // 🔹 Login
  onLogin() {
    if (!this.email || !this.contrasena) {
      this.mensaje = 'Debe ingresar email y contraseña';
      return;
    }

    this.authService.login(this.email, this.contrasena).subscribe({
      next: res => {
        // 🔹 Guardar token en localStorage
        localStorage.setItem('accessToken', res.accessToken);

        this.mensaje = 'Login exitoso ✅';
        // redirigir a la home o dashboard
        this.router.navigate(['/home']);
      },
      error: err => {
        this.mensaje = err.error || 'Credenciales incorrectas ❌';
      }
    });
  }

  // 🔹 Recuperación de contraseña
  onForgotPassword() {
    if (!this.forgotEmail) {
      this.mensaje = 'Ingrese un correo válido';
      return;
    }

    this.authService.registrarUsuario // 👈 OJO, esto NO es forgot-password
    // Mejor llamamos directo con HttpClient porque no lo tienes en AuthService
    // Lo dejo corregido abajo:

    this.authService['http'].post(
      'http://localhost:8080/auth/forgot-password',
      { email: this.forgotEmail },
      { responseType: 'text' }
    ).subscribe({
      next: res => this.mensaje = res,
      error: err => this.mensaje = err.error || 'Error al enviar el enlace ❌'
    });
  }
}
