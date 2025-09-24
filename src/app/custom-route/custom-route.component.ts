import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-route',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './custom-route.component.html',
  styleUrl: './custom-route.component.css'
})
export class CustomRouteComponent {
  
  formMyRoute:any;

  constructor(private http: HttpClient, private customRouteService: CustomRouteService, private formB: FormBuilder) {
    this.formMyRoute = this.formB.group({
      titulo_ruta: ['', Validators.required]
    });
  } 

  submitForm(){
    const valor = this.formMyRoute.value.titulo_ruta;
    console.log("info formulario:", valor);
    this.enviarABack(valor);
  }

  enviarABack(valorForm:any){
    this.customRouteService.postTituloRutaUsuario(valorForm).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al enviar el título de la ruta.', error);
      }
    });
  }

}
