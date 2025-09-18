import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup;
  token!: string;
  mensaje: string = '';
  tipoMensaje: 'error' | 'success' = 'success';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.mensaje = 'Token inválido o inexistente';
      this.tipoMensaje = 'error';
    }

    this.form = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    }, { validators: this.passwordsCoinciden });
  }

  // Validador personalizado para comprobar que ambas contraseñas coinciden
  private passwordsCoinciden(form: FormGroup) {
    const nueva = form.get('nuevaContrasena')?.value;
    const confirmar = form.get('confirmarContrasena')?.value;
    return nueva && confirmar && nueva !== confirmar
      ? { noCoinciden: true }
      : null;
  }

  resetPassword() {
    if (this.form.invalid) return;

    this.cargando = true;
    this.http.post(`http://localhost:8080/auth/reset-password?token=${this.token}`, this.form.value)
      .subscribe({
        next: () => {
          this.mensaje = 'Contraseña actualizada correctamente. Serás redirigido al login...';
          this.tipoMensaje = 'success';
          this.cargando = false;
          setTimeout(() => this.router.navigate(['/login']), 2500);
        },
        error: (err) => {
          this.mensaje = err.error || 'Error al actualizar la contraseña';
          this.tipoMensaje = 'error';
          this.cargando = false;
        }
      });
  }
}
