import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  forgotEmail: string = '';
  mostrarRecuperacion: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}
  
  onLogin() {
    this.http.post('/api/auth/signin', { email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        alert("Login exitoso");
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => alert("Usuario o contraseña incorrectos")
    });
  }

  onForgotPassword() {
    this.http.post('/api/auth/forgot-password', { email: this.forgotEmail }).subscribe({
      next: () => alert("Revisa tu correo para restablecer la contraseña"),
      error: () => alert("Error al enviar el correo")
    });
  }
}
