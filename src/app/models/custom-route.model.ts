// Enviar datos a BBDD
export interface RutaUsuario {
  id_usuario: number,
  titulo_ruta: string;
  descripcion_ruta: string;
}

export interface SitioRutaUsuario {
  id_ruta: number,
  id_favorito: number
}

// Mostrar datos guardados
export interface RutaCreada{
  id:number,
  titulo_ruta:string,
  descripcion_ruta:string,
  imagen_destacada?:string
}

export interface SitiosRutaUsuarioCreada{
  id:number,
  idRuta:number,
  idSitio:number,
  nombre:string
}

export interface SitioFavoritosUsuario{
  id:number,
  nombre:string
}

// Mostrar datos del usuario
export interface User{
  id:number
}