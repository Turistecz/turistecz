import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../services/favoritos.service';
import { RutaCreada, SitioFavoritosUsuario, SitioRutaSeleccionado, SitioRutaUsuarioCreada, User} from '../models/custom-route.model';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-custom-route',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CdkDrag, CdkDropList],
  templateUrl: './custom-route.component.html',
  styleUrl: './custom-route.component.css'
})
export class CustomRouteComponent {
  formularioNuevaRuta:any; // Formulario para crear una nueva ruta
  formularioEditarRuta:any; // Formulario para editar una ruta existente

  sitiosRutaSeleccioandos:SitioRutaSeleccionado[]=[]; // Todos los sitios seleccionados por el usuario
  sitioRutaSeleccionado:SitioRutaSeleccionado = { id_ruta:0, id_sitio:0, nombre:'', orden:0 }; // Contenido de cada sitio seleccionado por el usuario
  sitiosRutaOrdenados:SitioRutaSeleccionado[]=[]; // Sitios previamente seleccionados ordenados por el usuario

  datoRutasCreadas:RutaCreada={ id:0, titulo_ruta:'',descripcion_ruta:'' } // Estructura de una Ruta creada por el usuario
  datosRutasCreadas:RutaCreada[]=[]; // Todas las rutas que el usuario ha creado 
  ultimaRutaCreada!:RutaCreada; // Última ruta creada por el usuario
  sitiosRuta:SitioRutaUsuarioCreada[]=[]; // Mostrar sitios de una ruta concreta existente

  sitioFavoritosUsuario:SitioFavoritosUsuario = { id:0, nombre:'' }; // Estructura de un sitio favoritos seleccionado por el usuario
  sitiosFavoritosUsuario:SitioFavoritosUsuario[]=[]; // Todos los sitios favoritos seleccionados por el usuario
  
  usuario:User = {id:0}; // Datos del usuario

  idRutaEliminar:number=0; // Copia id ruta para eliminarla

  editarRuta = { id:0, titulo:'', descripcion:''}; // Copia datos de la ruta seleccionada para guardarlos como valor por defecto en el formulario de edicion
  sitiosFavotitosSeleccionados:SitioFavoritosUsuario[]=[]; // Guardar sitios previamente seleccionados por el usuario al crear la ruta
  sitiosFavoritosNoSeleccionados:SitioFavoritosUsuario[]=[]; // Guardar sitios previamente no seleccionados por el usuario al crear la ruta
  sitiosRutaReordenados:SitioRutaSeleccionado[]=[]; // Guardar sitios que el usuario ha reordenado al editar la ruta

  constructor(private customRouteService: CustomRouteService, private formB: FormBuilder, private favoritosService: FavoritosService){
    this.formularioNuevaRuta = this.formB.group({
      titulo_ruta: ['', Validators.required],
      descripcion_ruta: ['']
    });
    this.formularioEditarRuta = this.formB.group({
      titulo_ruta: ['', Validators.required],
      descripcion_ruta: ['']
    })
  } 

  // DATOS INTRODUCIDOS POR EL USUARIO EN EL FORMULARIO
  // Recuperar datos introducidos por el usuario despues de hacer click en el botón "guardar"
  onSubmit() {
    const tituloRuta = this.formularioNuevaRuta.value.titulo_ruta;
    const descripcionRuta = this.formularioNuevaRuta.value.descripcion_ruta;
    this.enviarDatosRutaUsuario(this.usuario.id, tituloRuta, descripcionRuta);
  }

  // Cuando el usuario selecciona un checkbox, se añade cada "sitioRutaSeleccionado" a "sitiosRutaSeleccioandos[]"
  onCheckboxChange(event: any, idSitio: number, nombreSitio:string) {
    if (event.target.checked) {
      this.sitioRutaSeleccionado = { id_sitio:idSitio, nombre:nombreSitio, orden:0 }
      this.sitiosRutaSeleccioandos.push(this.sitioRutaSeleccionado)
    } else {
      this.sitioRutaSeleccionado = { id_sitio:idSitio, nombre:nombreSitio, orden:0 }
      let eliminarSitio = this.sitiosRutaSeleccioandos.filter(sitio => sitio.id_sitio !== this.sitioRutaSeleccionado.id_sitio)
      this.sitiosRutaSeleccioandos = eliminarSitio;
    }
  }
  
  // Funciones para que el usuario pueda ordenar la lista de sitios seleccionados (Instalar package: ng add @angular/cdk)
  drop(event:CdkDragDrop<string[]>) {
    moveItemInArray(this.sitiosRutaSeleccioandos, event.previousIndex, event.currentIndex);
    this.ordenarSitios()
  }

  ordenarSitios(){
    this.sitiosRutaOrdenados = this.sitiosRutaSeleccioandos.map((sitio, index)=>({
      id_sitio: sitio.id_sitio,
      nombre: sitio.nombre,
      orden: index +1
    }))
  }

  // Envia a la BBDD los datos que corresponden a la tabla "Ruta Usuario"
  enviarDatosRutaUsuario(id_usuario:number, titulo:any, descripcion:any) {
    this.customRouteService.postNuevaRutaUsuario(id_usuario, titulo, descripcion).subscribe({
      next: (response) => {
        this.ultimaRutaCreada = response;
        let idRuta:number = this.ultimaRutaCreada.id;
        if(this.sitiosRutaOrdenados.length >0){
          this.sitiosRutaOrdenados.forEach((sitio) => {
            this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id_sitio, sitio.orden)
          })
        } else {
          this.sitiosRutaSeleccioandos.forEach(sitio=>{
            this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id_sitio, sitio.orden)
          })
        }
      },
      error: (error) => {
        console.error('Error al enviar la ruta.', error);
      }
    });
  }

  // Envia a la BBDD los datos que corresponden a la tabla "Sitios Ruta Usuario"
  enviarDatosSitiosRutaUsuario(ruta:number, sitio:number, orden:number){
    this.customRouteService.postSitioRutaUsuario(ruta, sitio, orden).subscribe({
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

  // EDITAR RUTA
  copiarDatosRuta(id_ruta:number, titulo:string, descripcion:string){
    this.editarRuta = {
      id:id_ruta,
      titulo:titulo,
      descripcion:descripcion
    }
    this.sitiosSeleccionadosYSitiosNoSeleccionados();
  }

  enviarEdicionRuta(){
    let titulo = this.formularioEditarRuta.value.titulo_ruta;
    let descripcion = this.formularioEditarRuta.value.descripcion_ruta;
    let idRuta = this.editarRuta.id;

    if(titulo !== '' && descripcion !==''){
      this.editarTitulo(titulo);
    } else if(titulo !== ''){
      this.editarTitulo(titulo);
    } else if(descripcion !== ''){
      this.editarDescripcion(descripcion);
    } 
    
    if(this.sitiosRutaReordenados.length>0){
      // eliminar sitios
      let sitiosEliminar = this.sitiosRuta.filter(sitio => sitio.idRuta === idRuta)
      sitiosEliminar.forEach(sitioEliminar => {
        this.eliminarSitios(sitioEliminar.id);
      })
      // enviar sitios reordenados
      this.sitiosRutaReordenados.forEach((sitio) => {
        this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id_sitio, sitio.orden)
      })
    } else {
      let sitiosEliminar = this.sitiosRuta.filter(sitio => sitio.idRuta === idRuta)
      sitiosEliminar.forEach(sitioEliminar => {
        this.eliminarSitios(sitioEliminar.id);
      })
      this.sitiosFavotitosSeleccionados.forEach(sitio=>{
        this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id, 0)
      })
    }
  }

  
  editarTitulo(titulo:string){
    this.customRouteService.putTituloRutaUsuario(this.editarRuta.id, titulo).subscribe({
        next: (response) => {
          let descripcion = this.formularioEditarRuta.value.descripcion_ruta;
          if(descripcion !== ''){
            this.editarDescripcion(descripcion)
          }
          this.recargarPagina();
        },
        error: (error) => {
          console.error('Error al modificar la ruta.', error);
        }
      }) 
  }

  editarDescripcion(descripcion:string){
    this.customRouteService.putDescripcionRutaUsuario(this.editarRuta.id, descripcion).subscribe({
      next: (response) => {
        this.recargarPagina();
      },
      error: (error) => {
        console.error('Error al modificar la ruta.', error);
      }
    })
  }
  
  sitiosSeleccionadosYSitiosNoSeleccionados(){
    let sitioSeleccionado:SitioFavoritosUsuario = { id:0, nombre:'' }
    this.sitiosFavotitosSeleccionados = this.sitiosRuta.filter(sitioR => (sitioR.idRuta === this.editarRuta.id))
    .map(sitio => sitioSeleccionado = {id:sitio.idSitio, nombre:sitio.nombre})
    let idsSitiosSeleccionados = this.sitiosFavotitosSeleccionados.map((sitio:any) => sitio.id);
    this.sitiosFavoritosNoSeleccionados = this.sitiosFavoritosUsuario.filter(sitioF => !idsSitiosSeleccionados.includes(sitioF.id));
  }

  seleccionarSitio(event: any , idSitio: number, nombreSitio:string){
    if (event.target.checked) {
      let sitioRutaSeleccionado = { id:idSitio, nombre:nombreSitio };
      this.sitiosFavotitosSeleccionados.push(sitioRutaSeleccionado)
      let idsSitiosSeleccionados = this.sitiosFavotitosSeleccionados.map((sitio:any) => sitio.id);
      this.sitiosFavoritosNoSeleccionados = this.sitiosFavoritosNoSeleccionados.filter(sitioF => !idsSitiosSeleccionados.includes(sitioF.id))
    } 
    else {
      let sitioRutaSeleccionado = { id:idSitio, nombre:nombreSitio };
      this.sitiosFavoritosNoSeleccionados.push(sitioRutaSeleccionado);
      let idsSitiosNoSeleccionados = this.sitiosFavoritosNoSeleccionados.map((sitio:any) => sitio.id);
      this.sitiosFavotitosSeleccionados = this.sitiosFavotitosSeleccionados.filter(sitioF => !idsSitiosNoSeleccionados.includes(sitioF.id))
    }
  }

  dropEditado(event:CdkDragDrop<string[]>) {
    moveItemInArray(this.sitiosFavotitosSeleccionados, event.previousIndex, event.currentIndex);
    this.reordenarSitios()
  }

  reordenarSitios(){
    this.sitiosRutaReordenados = this.sitiosFavotitosSeleccionados.map((sitio, index)=>({
      id_sitio: sitio.id,
      nombre: sitio.nombre,
      orden: index +1
    }))
  }

  // ELIMINAR RUTA
  copiarIdRuta(id_ruta:number){
    this.idRutaEliminar = id_ruta;
  }

  eliminarRuta(){
    this.customRouteService.deleteRutaUsuario(this.idRutaEliminar).subscribe({
      next: (response) => {
        this.recargarPagina();
      },
      error: (error) => {
        console.error('Error al eliminar la ruta.', error);
      }
    })
  }

  // ELIMINAR SITIOS
  eliminarSitios(id:number){
    this.customRouteService.deleteSitioRutaUsuario(id).subscribe({
      next: (response) => {
        // this.recargarPagina();
      },
      error: (error) => {
        console.error('Error al eliminar el sitio de la ruta.', error);
      }
    })

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
