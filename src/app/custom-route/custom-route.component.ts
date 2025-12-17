import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomRouteService } from '../services/custom-route.service';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../services/favoritos.service';
import { CrearRuta, MostrarRuta, MostrarSitioRuta, SitioFavoritosUsuario, SitioRutaSeleccionado, User} from '../models/custom-route.model';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-custom-route',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CdkDrag, CdkDropList],
  templateUrl: './custom-route.component.html',
  styleUrl: './custom-route.component.css'
})
export class CustomRouteComponent {
  formularioRuta:FormGroup; 

  // CREAR NUEVA RUTA + SELECCIONAR Y ORDENAR (O NO) SITIOS RUTA
  usuario:User = {id:0}; // Datos del usuario

  datosCrearRuta:CrearRuta = { id_usuario:0, titulo_ruta:'', descripcion_ruta:'' };

  sitiosFavoritosUsuario:SitioFavoritosUsuario[]=[]; 
  sitioFavoritosUsuario:SitioFavoritosUsuario = { id:0, nombre:'' }; 

  sitiosRutaSeleccioandos:SitioRutaSeleccionado[]=[]; 
  sitioRutaSeleccionado:SitioRutaSeleccionado = { id_ruta:0, id_sitio:0, nombre:'', orden:0 }; 
  sitiosRutaOrdenados:SitioRutaSeleccionado[]=[]; 

  // MOSTRAR RUTAS CREADAS Y SITIOS DE LA RUTA
  datosMostrarRutas:MostrarRuta[]=[]; 
  datoMostrarRuta:MostrarRuta = { id:0, titulo_ruta:'',descripcion_ruta:'' }; 
  mostrarSitiosRuta:MostrarSitioRuta[]=[]; 

  // EDITAR RUTA
  editarRuta:MostrarRuta = { id:0, titulo_ruta:'', descripcion_ruta:'' };
  editarSitiosSeleccionados:SitioFavoritosUsuario[]=[];
  editarSitiosNoSeleccionados:SitioFavoritosUsuario[]=[];
  sitiosRutaReordenados:SitioRutaSeleccionado[]=[]; 

  // ELMINIAR RUTA
  idRutaEliminar:number=0; // Copia id ruta para eliminarla

  constructor(private customRouteService: CustomRouteService, private formB: FormBuilder, private favoritosService: FavoritosService){
    this.formularioRuta = this.formB.group({
      titulo_ruta: ['', Validators.required],
      descripcion_ruta: ['']
    });
  } 

  // CREAR NUEVA RUTA + SELECCIONAR Y ORDENAR (O NO) SITIOS RUTA
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

  enviarDatosRutaUsuario() {
    this.datosCrearRuta.titulo_ruta = this.formularioRuta.value.titulo_ruta;
    this.datosCrearRuta.descripcion_ruta = this.formularioRuta.value.descripcion_ruta;
    this.customRouteService.postNuevaRutaUsuario(
      this.usuario.id, 
      this.datosCrearRuta.titulo_ruta, 
      this.datosCrearRuta.descripcion_ruta
    ).subscribe({
      next: (response) => {
        this.datoMostrarRuta = response;
        let idRuta = this.datoMostrarRuta.id;
        if(this.sitiosRutaOrdenados.length > 0){
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

  // Seleccionar o deseleccionar sitios guardados en favoritos en una ruta
  onCheckboxChange(event: any, idSitio: number, nombreSitio:string) {
    if (event.target.checked) {
      this.sitioRutaSeleccionado = { id_ruta:0, id_sitio:idSitio, nombre:nombreSitio, orden:0 }
      this.sitiosRutaSeleccioandos.push(this.sitioRutaSeleccionado)
    } else {
      this.sitioRutaSeleccionado = { id_ruta:0, id_sitio:idSitio, nombre:nombreSitio, orden:0 }
      let eliminarSitio = this.sitiosRutaSeleccioandos.filter(sitio => sitio.id_sitio !== this.sitioRutaSeleccionado.id_sitio)
      this.sitiosRutaSeleccioandos = eliminarSitio;
    }
  }
  
  // Ordenar la lista de sitios seleccionados (Instalar package: ng add @angular/cdk)
  drop(event:CdkDragDrop<string[]>) {
    moveItemInArray(this.sitiosRutaSeleccioandos, event.previousIndex, event.currentIndex);
    this.sitiosRutaOrdenados = this.sitiosRutaSeleccioandos.map((sitio, index)=>({
      id_ruta:0,
      id_sitio: sitio.id_sitio,
      nombre: sitio.nombre,
      orden: index +1
    }))
  }

  // MOSTRAR RUTAS CREADAS Y SITIOS DE LA RUTA
  mostrarRutasUsuarioCreadas(){
    this.customRouteService.getRutasUsuarioExistentes(this.usuario.id).subscribe({
      next: (response) => {
        response.map(resp=>{
          this.datoMostrarRuta = {
            id:resp.id,
            titulo_ruta:resp.titulo_ruta,
            descripcion_ruta:resp.descripcion_ruta
          }
          this.datosMostrarRutas.push(this.datoMostrarRuta)
        })
      },
      error: (error) => {
        console.error('Error al obtener las rutas del usuario.', error);
      }
    });
  }

  mostrarSitiosRutaUsuario(){
    this.customRouteService.getSitiosRutaUsaurio().subscribe({
      next: (response) => {
        this.mostrarSitiosRuta = response;
      },
      error: (error) => {
        console.error('Error al obtener los sitios de la ruta del usuario.', error);
      }
    })
  }
  
  // EDITAR RUTA
  copiarDatosRuta(id_ruta:number, titulo:string, descripcion:string){
    this.editarRuta = {
      id:id_ruta,
      titulo_ruta:titulo,
      descripcion_ruta:descripcion
    }
    this.sitiosSeleccionadosYSitiosNoSeleccionados();
  }

  enviarEdicionRuta(){
    let titulo = this.formularioRuta.value.titulo_ruta;
    let descripcion = this.formularioRuta.value.descripcion_ruta;
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
      let sitiosEliminar = this.mostrarSitiosRuta.filter(sitio => sitio.idRuta === idRuta)
      sitiosEliminar.forEach(sitioEliminar => {
        this.eliminarSitios(sitioEliminar.id);
      })
      // enviar sitios reordenados
      this.sitiosRutaReordenados.forEach((sitio) => {
        this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id_sitio, sitio.orden)
      })
    } else {
      let sitiosEliminar = this.mostrarSitiosRuta.filter(sitio => sitio.idRuta === idRuta)
      sitiosEliminar.forEach(sitioEliminar => {
        this.eliminarSitios(sitioEliminar.id);
      })
      this.editarSitiosSeleccionados.forEach(sitio=>{
        this.enviarDatosSitiosRutaUsuario(idRuta, sitio.id, 0)
      })
    }
  }

  editarTitulo(titulo:string){
    this.customRouteService.putTituloRutaUsuario(this.editarRuta.id, titulo).subscribe({
        next: (response) => {
          let descripcion = this.formularioRuta.value.descripcion_ruta;
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
    this.editarSitiosSeleccionados = this.mostrarSitiosRuta.filter(sitioR => (sitioR.idRuta === this.editarRuta.id))
    .map(sitio => sitioSeleccionado = {id:sitio.idSitio, nombre:sitio.nombre})
    let idsSitiosSeleccionados = this.editarSitiosSeleccionados.map((sitio:any) => sitio.id);
    this.editarSitiosNoSeleccionados = this.sitiosFavoritosUsuario.filter(sitioF => !idsSitiosSeleccionados.includes(sitioF.id));
  }

  seleccionarSitio(event: any , idSitio: number, nombreSitio:string){
    if (event.target.checked) {
      let sitioRutaSeleccionado = { id:idSitio, nombre:nombreSitio };
      this.editarSitiosSeleccionados.push(sitioRutaSeleccionado)
      let idsSitiosSeleccionados = this.editarSitiosSeleccionados.map((sitio:any) => sitio.id);
      this.editarSitiosNoSeleccionados = this.editarSitiosNoSeleccionados.filter(sitioF => !idsSitiosSeleccionados.includes(sitioF.id))
    } 
    else {
      let sitioRutaSeleccionado = { id:idSitio, nombre:nombreSitio };
      this.editarSitiosNoSeleccionados.push(sitioRutaSeleccionado);
      let idsSitiosNoSeleccionados = this.editarSitiosNoSeleccionados.map((sitio:any) => sitio.id);
      this.editarSitiosSeleccionados = this.editarSitiosSeleccionados.filter(sitioF => !idsSitiosNoSeleccionados.includes(sitioF.id))
    }
  }

  dropEditado(event:CdkDragDrop<string[]>) {
    moveItemInArray(this.editarSitiosSeleccionados, event.previousIndex, event.currentIndex);
    this.reordenarSitios()
  }

  reordenarSitios(){
    const idRuta = this.editarRuta.id;
    this.sitiosRutaReordenados = this.editarSitiosSeleccionados.map((sitio, index)=>({
      id_ruta:idRuta,
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
        this.recargarPagina();
      },
      error: (error) => {
        console.error('Error al eliminar el sitio de la ruta.', error);
      }
    })

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
    this.mostrarRutasUsuarioCreadas();
    this.mostrarSitiosFavoritosUsuario();
    this.mostrarSitiosRutaUsuario();
  }
}
