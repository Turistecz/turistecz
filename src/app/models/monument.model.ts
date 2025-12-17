import { EnumServiciosAdaptabilidad } from "../place-card-list/EnumServiciosAdaptabilidad";


export interface MonumentItem {
  id: number;
  title: string;
  nombre: string;
  latitud: number;
  longitud: number;
  description: string;
  address: string;
  horario: string;
  phone: string;
  price: string;
  image: string;
  uri: string;
  imagenes: [{
    url: string,
    nombre: string,
    copy: string,
    id: number,
  }]
    rampas: EnumServiciosAdaptabilidad,
    ascensores: EnumServiciosAdaptabilidad,
    puertas_automaticas: EnumServiciosAdaptabilidad,
    escaleras_mecanicas: EnumServiciosAdaptabilidad,
    servicios_adaptados: EnumServiciosAdaptabilidad,
    sala_lactancia: EnumServiciosAdaptabilidad,
    cambiador: EnumServiciosAdaptabilidad,
    parking_adaptado: EnumServiciosAdaptabilidad,
    bancos: EnumServiciosAdaptabilidad,
    mostrador_adaptado: EnumServiciosAdaptabilidad,
    sin_barreras_arquitectonicas: EnumServiciosAdaptabilidad,
    braille: EnumServiciosAdaptabilidad,
    interprete_lengua_signos: EnumServiciosAdaptabilidad,
    videos_subtitulos: EnumServiciosAdaptabilidad,
    ayudas_visuales: EnumServiciosAdaptabilidad,
    guias_turisticos_multiidioma: EnumServiciosAdaptabilidad,
    elementos_audiovisuales_multiidioma: EnumServiciosAdaptabilidad,
    documentacion_multiidioma: EnumServiciosAdaptabilidad,
    visitas_grupales: EnumServiciosAdaptabilidad,
    ayuda_movilidad: EnumServiciosAdaptabilidad,
    lenguaje_simple: EnumServiciosAdaptabilidad,
    acceso_perros_guias: EnumServiciosAdaptabilidad,
    acceso_perros_asistencia: EnumServiciosAdaptabilidad

}

export interface MonumentResponse {
  result: MonumentItem[];
}
