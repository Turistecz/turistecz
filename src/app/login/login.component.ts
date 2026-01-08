import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service';
import { CleanFilter } from '../models/filter.model';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,BreadcrumbsComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private loginService: LoginService, private router: Router, private apiFilterService: FilterService) {}

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
        // Llamar a loginService.setUsuario para actualizar el observable y notificar al header
        this.loginService.setUsuario(res.usuario);
        const usuarioStr = localStorage.getItem('usuario');
        if (usuarioStr){
          const usuario = JSON.parse(usuarioStr);
          //crear filtro "vacio" y añadirselo al usuario si no lo tiene ya
          this.apiFilterService.comprobarUserFilter(Number(usuario.id), Number(usuario.id)).subscribe({
            next: res => {
              if (!res){
                let newFilter: CleanFilter = {
                  id: Number(usuario.id),
                  museosExposiciones: false,
                  monumentosEsculturas: false,
                  zonasVerdes: false,
                  arquitectura: false,
                  arteMudejar: false,
                  arteRomano: false,
                  rampas: false,
                  ascensores: false,
                  puertasAutomaticas: false,
                  escalerasMecanicas: false,
                  serviciosAdaptados: false,
                  parkingAdaptado: false,
                  mostradorAdaptado: false,
                  sinBarrerasArquitectonicas: false,
                  braille: false,
                  interpreteLenguaSignos: false,
                  videosSubtitulados: false,
                  ayudasVisuales: false,
                  bancos: false,
                  ayudaMovilidad: false,
                  lenguajeSimple: false,
                  accesoPerrosGuias: false,
                  accesoPerrosAsistencia: false,
                  salaLactancia: false,
                  cambiador: false,
                  visitasGrupales: false,
                  guiasTuristicosMultiidioma: false,
                  elementosAudiovisualesMultiidioma: false,
                  documentacionMultiidioma: false,
                };
                this.apiFilterService.addNewFilter(newFilter).subscribe({
                  next: res => {
                    this.apiFilterService.addUserFilter(Number(usuario.id), Number(usuario.id)).subscribe();
                  }
                }); 
              }
            }
          });
        }
        
        this.router.navigate(['/']); // redirige a home directamente
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
