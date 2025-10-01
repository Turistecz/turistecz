export interface Category {
    type: string;
    name: string;           // Ej: "Museos/Exposiciones"
    keywords: string[];
    
}

export interface FilterItem {
  features: [ 
    {id: boolean},
    {museosExposiciones: boolean},
    {monumentosEsculturas: boolean},
    {zonasVerdes: boolean},
    {arquitectura: boolean},
    {arteMudejar: boolean},
    {arteRomano: boolean},
    {rampas: boolean},
    {ascensores: boolean},
    {puertasAutomaticas: boolean},
    {escalerasMecanicas: boolean},
    {serviciosAdaptados: boolean},
    {parkingAdaptado: boolean},
    {mostradorAdaptado: boolean},
    {sinBarrerasArquitectonicas: boolean},
    {braille: boolean},
    {interpreteLenguaSignos: boolean},
    {videosSubtitulados: boolean},
    {ayudasVisuales: boolean},
    {bancos: boolean},
    {ayudaMovilidad: boolean},
    {lenguajeSimple: boolean},
    {accesoPerrosGuias: boolean},
    {accesoPerrosAsistencia: boolean},
    {salaLactancia: boolean},
    {cambiador: boolean},
    {visitasGrupales: boolean},
    {guiasTuristicosMultiidioma: boolean},
    {elementosAudiovisualesMultiidioma: boolean},
    {documentacionMultiidioma: boolean},
  ]
}

export interface FilterResponse {
  result: FilterItem[];
}

export interface FilterUser {
  id: number;
  usuario: any;
  sitio: FilterItem;
}

export interface CleanFilter {
  id: null,
  museosExposiciones: boolean,
  monumentosEsculturas: boolean,
  zonasVerdes: boolean,
  arquitectura: boolean,
  arteMudejar: boolean,
  arteRomano: boolean,
  rampas: boolean,
  ascensores: boolean,
  puertasAutomaticas: boolean,
  escalerasMecanicas: boolean,
  serviciosAdaptados: boolean,
  parkingAdaptado: boolean,
  mostradorAdaptado: boolean,
  sinBarrerasArquitectonicas: boolean,
  braille: boolean,
  interpreteLenguaSignos: boolean,
  videosSubtitulados: boolean,
  ayudasVisuales: boolean,
  bancos: boolean,
  ayudaMovilidad: boolean,
  lenguajeSimple: boolean,
  accesoPerrosGuias: boolean,
  accesoPerrosAsistencia: boolean,
  salaLactancia: boolean,
  cambiador: boolean,
  visitasGrupales: boolean,
  guiasTuristicosMultiidioma: boolean,
  elementosAudiovisualesMultiidioma: boolean,
  documentacionMultiidioma: boolean,
}