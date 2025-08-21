// INTERFAZ PARA LA FRONT DETAIL DE LAS RUTAS
export interface routeDetails { 
    id: number;
    nombre: string;
    descripcion: string;
    imagen_destacada: string; 
}

// INTERFACE PARA LOS SITIOS DE LA RUTA POR ID

// export interface sitioDetails {
//     id: string;
//     nombre: string;
//     url: string;
// }

// export interface sitioResponse {
//   // id: string;
//   imagenes: sitioDetails[];
// }

export interface sitioResponse {
  imagenes: {
    id: string;
    url: string;
    nombre: string;
    
  };
}