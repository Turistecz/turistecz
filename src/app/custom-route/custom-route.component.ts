import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../services/favoritos.service';
import { RutaCreada, SitioFavoritosUsuario, SitioRutaUsuarioCreada, User} from '../models/custom-route.model';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-custom-route',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CdkDrag, CdkDropList],
  templateUrl: './custom-route.component.html',
  styleUrl: './custom-route.component.css'
})
export class CustomRouteComponent {
  formularioNuevaRuta:any; // Formulario para crear una nueva ruta
  idsSitiosSeleccionados:number[]=[]; // Array para guardar los id de los sitios seleccionados por el usuario en el formulario
  nombresSitiosSeleccionados:string[]=[];
  datoRutasCreadas:RutaCreada={ id:0, titulo_ruta:'',descripcion_ruta:'' } // Estructura de una Ruta creada por el usuario
  datosRutasCreadas:RutaCreada[]=[]; // Todas las rutas que el usuario ha creado 
  ultimaRutaCreada!:RutaCreada; // Última ruta creada por el usuario
  sitiosRuta:SitioRutaUsuarioCreada[]=[];

  sitioFavoritosUsuario:SitioFavoritosUsuario = { id:0, nombre:'' }; // Estructura de un sitio favoritos seleccionado por el usuario
  sitiosFavoritosUsuario:SitioFavoritosUsuario[]=[]; // Todos los sitios favoritos seleccionados por el usuario
  
  usuario:User = {id:0}; // Datos del usuario

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
  onCheckboxChange(event: any, idSitio: number, nombreSitio:string) {
    if (event.target.checked) {
      this.idsSitiosSeleccionados.push(idSitio); 
      this.nombresSitiosSeleccionados.push(nombreSitio);
    } 
  }
  
  // Ordenar lista de sitios seleccionados (Instalar package: ng add @angular/cdk)
  drop(event:CdkDragDrop<string[]>) {
    moveItemInArray(this.nombresSitiosSeleccionados, event.previousIndex, event.currentIndex);
  }

  // Envia a la BBDD los datos que corresponden a la tabla "Ruta Usuario"
  enviarDatosRutaUsuario(id_usuario:number, titulo:any, descripcion:any) {
    this.customRouteService.postNuevaRutaUsuario(id_usuario, titulo, descripcion).subscribe({
      next: (response) => {
        this.ultimaRutaCreada = response;
        let idRuta:number = this.ultimaRutaCreada.id;
        this.idsSitiosSeleccionados.forEach(sitioRuta => {
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
        this.recargarPagina();
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
        response.map(resp=>{
          this.datoRutasCreadas = {
            id:resp.id,
            titulo_ruta:resp.titulo_ruta,
            descripcion_ruta:resp.descripcion_ruta
          }
          this.datosRutasCreadas.push(this.datoRutasCreadas)
        })
      },
      error: (error) => {
        console.error('Error al obtener las rutas del usuario.', error);
      }
    });
  }

  // Muestra todos los sitios que el usuario a seleccionado para cada ruta
  mostrarSitiosRutaUsuario(){
    this.customRouteService.getSitiosRutaUsaurio().subscribe({
      next: (response) => {
        this.sitiosRuta = response;
      },
      error: (error) => {
        console.error('Error al obtener los sitios de la ruta del usuario.', error);
      }
    })
  }

  // Mostrar sitios favoritos que el usuario ha seleccionado
  mostrarSitiosFavoritosUsuario(){
    this.favoritosService.getMisFavoritos(this.usuario.id).subscribe({
      next: (response) => {
        response.map(resp=>{
          this.sitioFavoritosUsuario = {
            id:resp.id,
            nombre:resp.nombre,
          }
          this.sitiosFavoritosUsuario.push(this.sitioFavoritosUsuario)
        });
      },
      error: (error) => {
        console.error('Error al obtener los sitios favoritos del usuario.', error);
      }
    });
  }

  // PENDIENTE: AL RECARGAR, SE MUESTRE LA PAGINA ACTUAL
  recargarPagina(){
    window.location.reload();
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
    this.mostrarSitiosRutaUsuario();
  }
}
