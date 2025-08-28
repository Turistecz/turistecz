// INTERFAZ PARA LA FRONT DETAIL DE LAS RUTAS
export interface routeDetails { 
    id: number;
    nombre: string;
    descripcion: string;
    imagen_destacada: string; 
}

export interface textoDetails{
  nombre: string,
  imagenes: {
    url: string;
  },
  sitio_ruta_texto: string;
  
}




