import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports : [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (usuario) => {
          console.log('Login exitoso:', usuario);
          
          // Guarda en localStorage si quieres mantener sesión
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['']); // Redirige a otra página
         
        },
        error: (err) => {
          console.error('Error en login:', err);
          alert('Email o contraseña incorrectos');
        }
      });
    }
  }
}
