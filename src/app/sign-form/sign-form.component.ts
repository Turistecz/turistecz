import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})
export class SignformComponent {
  password: string = '';
  confirmPassword: string = '';

  // Validador personalizado de email con expresión regular
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

    alert('Formulario válido. Enviando...');
  }
}
