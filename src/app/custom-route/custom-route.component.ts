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
  // PENDIENTE: crear models
  formularioNuevaRuta:any; // Formulario para crear una nueva ruta
  datosRutasCreadas:any; // Rutas que el usuario ha creado almacenadas en la BBDD
  sitiosFavoritosUsuario:any; // sitios favoritos seleccionados por el usuario
  sitiosSeleccionados:number[]=[]; // Array para guardar los id de los sitios seleccionados por el usuario en el formulario
  ultimaRutaCreada:any; // Última ruta creada por el usuario
  usuario:any; // Datos del usuario

  constructor(private customRouteService: CustomRouteService, private formB: FormBuilder, private favoritosService: FavoritosService){
    /* Constructor del formulario para crear una nueva ruta */
    this.formularioNuevaRuta = this.formB.group({
      titulo_ruta: ['', Validators.required],
      descripcion_ruta: ['']
    });
  } 

  // DATOS INTRODUCIDOS POR EL USUARIO EN EL FORMULARIO
  // Recuperar datos introducidos por el usuario despues de hacer click en el botón "guardar"
  onSubmit() {
    const tituloRuta = this.formularioNuevaRuta.value.titulo_ruta;
    const descripcionRuta = this.formularioNuevaRuta.value.descripcion_ruta;
    this.enviarDatosRutaUsuario(this.usuario.id, tituloRuta, descripcionRuta);
  }

  // Cuando el usuario selecciona un checkbox, se añade el id del sitio al array "sitios:number[]=[]"
  onCheckboxChange(event: any, idSitio: number) {
    if (event.target.checked) {
      this.sitiosSeleccionados.push(idSitio); 
    } 
  }
  
  // Envia a la BBDD los datos que corresponden a la tabla "Ruta Usuario"
  enviarDatosRutaUsuario(id_usuario:number, titulo:any, descripcion:any) {
    this.customRouteService.postNuevaRutaUsuario(id_usuario, titulo, descripcion).subscribe({
      next: (response) => {
        this.ultimaRutaCreada = response;
        let idRuta:number = this.ultimaRutaCreada.id;
        this.sitiosSeleccionados.forEach(sitioRuta => {
          this.enviarDatosSitiosRutaUsuario(idRuta, sitioRuta)
        })
      },
      error: (error) => {
        console.error('Error al enviar la ruta.', error);
      }
    });
  }

  // Envia a la BBDD los datos que corresponden a la tabla "Sitios Ruta Usuario"
  enviarDatosSitiosRutaUsuario(ruta:number, sitio:number){
    this.customRouteService.postSitioRutaUsuario(ruta, sitio).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error al enviar el sitio de la ruta.', error);
      }
    })
  }
  
  // Mostrar rutas que ha creado el usuario
  mostrarRutasUsuarioCreadas(){
    this.customRouteService.getRutasUsuarioExistentes(this.usuario.id).subscribe({
      next: (response) => {
        this.datosRutasCreadas = response; 
      },
      error: (error) => {
        console.error('Error al obtener las rutas del usuario.', error);
      }
    });
  }

  // Mostrar sitios favoritos que el usuario ha seleccionado
  mostrarSitiosFavoritosUsuario(){
    this.favoritosService.getMisFavoritos(this.usuario.id).subscribe({
      next: (response) => {
        this.sitiosFavoritosUsuario = response;
      },
      error: (error) => {
        console.error('Error al obtener los sitios favoritos del usuario.', error);
      }
    });
  }

  ngOnInit(){
    // Recuperar datos del usuario
    const usuarioLS = localStorage.getItem('usuario');
    if (usuarioLS) {
      this.usuario = JSON.parse(usuarioLS);
    } else {
      console.error('No hay usuario logueado');
    }
    // Llamadas de funciones
    this.mostrarRutasUsuarioCreadas();
    this.mostrarSitiosFavoritosUsuario();
  }
}
