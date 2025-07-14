/*import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email: string = '';
  password: string = '';

  onLogin() {
    if (this.email && this.password) {
      // Aquí va la lógica de autenticación
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    } else {
      console.log('Formulario inválido');
    }
  }
}*/
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

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
          this.router.navigate(['/sitios']); // Redirige a otra página
        },
        error: (err) => {
          console.error('Error en login:', err);
          alert('Email o contraseña incorrectos');
        }
      });
    }
  }
}
