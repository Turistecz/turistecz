export interface RoutesPage{
    id:number,
    nombre:string,
    descripcion:string,
    duracion:string,
    imagen_destacada:string,
    subtitulo:string,
    sitios_ruta: RouteSites[]
   
}

export interface RouteSites{
    id:number,
    orden:number,
    texto:string
}


