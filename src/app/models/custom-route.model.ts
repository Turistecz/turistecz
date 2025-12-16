// CREAR NUEVA RUTA + SELECCIONAR Y ORDENAR (O NO) SITIOS RUTA
export interface User {
  id:number
}

export interface CrearRuta {
  id_usuario:number,
  titulo_ruta:string,
  descripcion_ruta:string
}

export interface SitioFavoritosUsuario{
  id:number,
  nombre:string
}

export interface SitioRutaSeleccionado {
  id_ruta:number,
  id_sitio:number,
  nombre:string,
  orden:number
}

// MOSTRAR RUTAS CREADAS Y SITIOS DE LA RUTA

export interface MostrarRuta {
  id:number,
  titulo_ruta:string,
  descripcion_ruta:string,
}

export interface MostrarSitioRuta {
  id:number,
  idRuta:number,
  idSitio:number,
  nombre:string,
  orden:number
}
