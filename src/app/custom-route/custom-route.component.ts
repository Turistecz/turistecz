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
  datosRutaBBDD!:any;
  imagenRuta = 'userRoute/img.svg';
  

  constructor(private http: HttpClient, private customRouteService: CustomRouteService, private formB: FormBuilder) {
    this.formMyRoute = this.formB.group({
      titulo_ruta: ['', Validators.required],
      descripcion_ruta: ['']
    });
  } 

  // Envio de datos a la BBDD
  onSubmit() {
    const valor = this.formMyRoute.value.titulo_ruta;
    const valor2 = this.formMyRoute.value.descripcion_ruta;
    console.log("titulo:", valor, "descripcion", valor2);
    this.enviarABack(valor, valor2);
    window.location.reload();
  }
  
  enviarABack(valorForm:any, valorForm2:any) {
    this.customRouteService.postRutaUsuario(valorForm, valorForm2).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al enviar el título de la ruta.', error);
      }
    });
  }
  
  // Mostrar rutas del usuario, ubicadas en la BBDD
  mostrarRutasUsuario(){
    this.customRouteService.getTituloRutaUsuario().subscribe({
      next: (response2) => {
        console.log('Rutas del usuario:', response2);
        return this.datosRutaBBDD = response2; 
      },
      error: (error) => {
        console.error('Error al obtener las rutas del usuario.', error);
      }
    });
  }

  ngOnInit(){
    this.mostrarRutasUsuario();
  }

}
