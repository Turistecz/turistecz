import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
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
  sitiosFavoritosUsuario:any; // sitios favoritos seleccionados por el usuario
  sitios:number[]=[]; // Array para guardar los id de los sitios seleccionados
  ultimaRuta:any;
  usuario:any;

  constructor(
    private customRouteService: CustomRouteService, 
    private formB: FormBuilder,
    private favoritosService: FavoritosService, 
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
    this.enviarARutaUsuario(this.usuario.id, tituloRuta, descripcionRuta);
  }
  
  enviarARutaUsuario(id_usuario:number, titulo:any, descripcion:any) {
    this.customRouteService.postRutaUsuario(id_usuario, titulo, descripcion).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.ultimaRuta = response;
        const idRuta = this.ultimaRuta.id;
        this.sitios.forEach(sitioRuta => {
          this.enviarASitiosRutaUsuario(idRuta, sitioRuta)
        })
      },
      error: (error) => {
        console.error('Error al enviar la ruta.', error);
      }
    });
  }

  enviarASitiosRutaUsuario(ruta:number, sitio:number){
    console.log("Ruta" + ruta);
    console.log("Sitio" + sitio)
    this.customRouteService.postSitioRutaUsuario(ruta, sitio).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al enviar el sitio de la ruta.', error);
      }
    })
  }
  
  // Mostrar rutas del usuario, ubicadas en la BBDD
  mostrarRutasUsuario(){
    this.customRouteService.getRutasUsuario(this.usuario.id).subscribe({
      next: (response) => {
        console.log('Rutas del usuario:', response);
        this.datosRutaBBDD = response; 
      },
      error: (error) => {
        console.error('Error al obtener las rutas del usuario.', error);
      }
    });
  }

  // Mostrar sitios favoritos del usuario
  mostrarSitiosFavoritos(){
    this.favoritosService.getMisFavoritos(this.usuario.id).subscribe({
      next: (response) => {
        console.log('Sitios favoritos del usuario:', response);
        this.sitiosFavoritosUsuario = response;
      },
      error: (error) => {
        console.error('Error al obtener los sitios favoritos del usuario.', error);
      }
    });
  }

  ngOnInit(){
    const usuarioLS = localStorage.getItem('usuario');
    if (usuarioLS) {
      this.usuario = JSON.parse(usuarioLS);
      console.log("usuario", this.usuario.id)
    } else {
      console.error('No hay usuario logueado');
      return;
    }

    this.mostrarRutasUsuario();
    this.mostrarSitiosFavoritos();
  }

}
