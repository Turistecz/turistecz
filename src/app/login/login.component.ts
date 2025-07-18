import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService, // ✅ Inyectamos LoginService
    private router: Router
  ) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (usuario) => {
          console.log('Login exitoso:', usuario);

          // ✅ Guardamos el usuario correctamente usando el servicio
          this.loginService.setUsuario(usuario);

          // ✅ Redirigimos (por ejemplo, al home)
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error en login:', err);
          alert('Email o contraseña incorrectos');
        }
      });
    }
  }
}
