import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-form',
  imports: [FormsModule],
  templateUrl: './sign-form.component.html',
  styleUrl: './sign-form.component.css'
})
export class SignformComponent {
   password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Aquí iría la lógica para enviar los datos al backend
    alert('Formulario válido. Enviando...');
  }
  
}
