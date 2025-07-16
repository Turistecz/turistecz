import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})
export class SignformComponent {
  password: string = '';
  confirmPassword: string = '';
  auth: AuthService;
  router: Router;

  constructor(authService: AuthService, rout: Router) {
    this.auth = authService;
    this.router = rout;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onSubmit(form: NgForm) {
    const emailValue = form.value.email;

    if (form.invalid || !this.isValidEmail(emailValue)) {
      alert('Por favor completa todos los campos requeridos correctamente.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const usuario = {
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      email: form.value.email,
      contrasena: this.password
    };

    
    this.auth.registrarUsuario(usuario).subscribe({
      next: (respuesta: string) => {
        alert(respuesta); // "Registro exitoso..."
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status === 400) {
          alert(error.error); // "El email ya está registrado"
        } else {
          alert('Ocurrió un error. Intenta de nuevo más tarde.');
        }
      }
    });
  }
}

