import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-custom-route',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './custom-route.component.html',
  styleUrl: './custom-route.component.css'
})
export class CustomRouteComponent {
  
  formMyRoute:any; // Formulario reactivo
  datosRutaBBDD!:any; // Rutas del usuario de la BBDD
  // imagenRuta = 'userRoute/img.svg';
  favoritosUsuario:any; // sitios favoritos seleccionados por el usuario
  sitios:number[]=[]; // Array para guardar los id de los sitios seleccionados
     

  constructor(
    private http: HttpClient, 
    private customRouteService: CustomRouteService, 
    private formB: FormBuilder,
    private favoritosService: FavoritosService
) 
    {
      /* CONSTRUCTOR DEL FORMULARIO REACTIVO */
      this.formMyRoute = this.formB.group({
        titulo_ruta: ['', Validators.required],
        descripcion_ruta: [''],
      });
    } 

  
  // Al seleccionar un checkbox, se añade el id del sitio al array "sitios"
  onCheckboxChange(event: any, idSitio: number) {
    if (event.target.checked) {
      this.sitios.push(idSitio); 
    } 
  }

  // Envio de datos a la BBDD
  onSubmit() {
    const tituloRuta = this.formMyRoute.value.titulo_ruta;
    const descripcionRuta = this.formMyRoute.value.descripcion_ruta;

    this.enviarARutaUsuario(tituloRuta, descripcionRuta);

    this.sitios.forEach(sitioRuta => {
      this.enviarASitiosRutaUsuario(sitioRuta)
    })

    window.location.reload();
  }
  
  enviarARutaUsuario(titulo:any, descripcion:any) {
    this.customRouteService.postRutaUsuario(titulo, descripcion).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al enviar el título de la ruta.', error);
      }
    });
  }

  enviarASitiosRutaUsuario(sitio:any){
    this.customRouteService.postSitioRutaUsuario(sitio).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al enviar el título de la ruta.', error);
      }
    })
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

  // Mostrar sitios favoritos del usuario
  mostrarSitiosFavoritos(){
    this.favoritosService.getMisFavoritos(5).subscribe({
      next: (response) => {
        console.log('Sitios favoritos del usuario:', response);
        return this.favoritosUsuario = response;
      },
      error: (error) => {
        console.error('Error al obtener los sitios favoritos del usuario.', error);
      }
    });
  }

  ngOnInit(){
    this.mostrarRutasUsuario();
    this.mostrarSitiosFavoritos();
  }

}
