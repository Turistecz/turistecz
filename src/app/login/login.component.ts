import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onLogin(form: any) {
    if (!form.valid) {
      alert('Por favor corrige los errores en el formulario');
      return;
    }

    this.authService.login(this.email, this.contrasena).subscribe({
      next: res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));

        this.router.navigate(['/home']); // redirige a home directamente
      },
      error: err => alert(err.error || '❌ Credenciales incorrectas')
    });
  }

      irARegistro(event: Event) {
        event.preventDefault();
        this.router.navigate(['/signin']);
      }

      irARecuperar(event: Event) {
        event.preventDefault();
        this.router.navigate(['/recuperar-contrasena']);
      }
}
