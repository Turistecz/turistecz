// CREAR NUEVA RUTA + SELECCIONAR Y ORDENAR (O NO) SITIOS RUTA
export interface User{
  id:number
}

export interface CrearRuta {
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

///////////////


export interface RutaUsuario {
  id_usuario: number,
  titulo_ruta: string;
  descripcion_ruta: string;
}

export interface SitioRutaUsuario {
  id_ruta: number,
  id_favorito: number
}

export interface RutaCreada{
  id:number,
  titulo_ruta:string,
  descripcion_ruta:string,
  imagen_destacada?:string
}

export interface SitioRutaUsuarioCreada{
  id:number,
  idRuta:number,
  idSitio:number,
  nombre:string
}
