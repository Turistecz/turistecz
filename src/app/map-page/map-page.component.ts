import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FilterComponent } from "../filter/filter.component";
import { Category } from '../models/filter.model';
import { cardsHome } from '../place-card/place-card.model';
import { categories } from '../models/filter.data';
import { firstValueFrom } from 'rxjs';
import { MonumentServiceService } from '../services/monument-service.service';
import { HttpClient } from '@angular/common/http';
import { MonumentItem } from '../models/monument.model';
import { NgClass } from "../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, FilterComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {

 categories:Category[]= categories;
 places:cardsHome[]=[]
 sitios: any[]=[];
 sortedCards: cardsHome[]=[];
 monumentos: MonumentItem[] = [];
 sitiosFiltrados: any[] = [];
 

 name:string = 'app-map-page';

  constructor(private http: HttpClient, private monumentService: MonumentServiceService) {}


  async loadSite(): Promise<void> {
    try {
      if (localStorage.getItem('monumentDDBBGlobal')) {
        this.sitios = JSON.parse(localStorage.getItem('monumentDDBBGlobal') || '{}');
      } else {
        const datos = await firstValueFrom(this.monumentService.getMonumentsNames());
        this.sitios = datos; 
        localStorage.setItem('monumentDDBBGlobal', JSON.stringify(datos))
      }
    } 
    catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }
 
  async loadImages(): Promise<void> {
  try {
      const datos = await firstValueFrom(this.http.get<MonumentItem[]>(
        'http://localhost:8080/api/sitios'
      ));

      // Guardamos todos los monumentos en el array
      this.monumentos = datos;
     


      // Creamos las cards a partir de todas las imágenes de todos los monumentos
      this.places = datos.flatMap(sitio =>
        sitio.imagenes.map((img: any) => ({
          nombre: img.nombre,
          url: img.url,
          id: img.id,
          rampas: sitio.rampas,
          ascensores: sitio.ascensores,
          puertas_automaticas: sitio.puertas_automaticas,
          escaleras_mecanicas: sitio.escaleras_mecanicas,
          servicios_adaptados: sitio.servicios_adaptados,
          sala_lactancia: sitio.sala_lactancia,
          cambiador: sitio.cambiador,
          parking_adaptado: sitio.parking_adaptado,
          bancos: sitio.bancos,
          mostrador_adaptado: sitio.mostrador_adaptado,
          sin_barreras_arquitectonicas: sitio.sin_barreras_arquitectonicas,
          braille: sitio.braille,
          interprete_lengua_signos: sitio.interprete_lengua_signos,
          videos_subtitulos: sitio.videos_subtitulos,
          ayudas_visuales: sitio.ayudas_visuales,
          guias_turisticos_multiidioma: sitio.guias_turisticos_multiidioma,
          elementos_audiovisuales_multiidioma: sitio.elementos_audiovisuales_multiidioma,
          documentacion_multiidioma: sitio.documentacion_multiidioma,
          visitas_grupales: sitio.visitas_grupales,
          ayuda_movilidad: sitio.ayuda_movilidad,
          lenguaje_simple: sitio.lenguaje_simple,
          acceso_perros_guias: sitio.acceso_perros_guias,
          acceso_perros_asistencia: sitio.acceso_perros_asistencia
        }))
      );

      this.sortedCards = this.places;
      console.log("info de places")
      console.log(this.places)

    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

   async ngOnInit(): Promise<void> {
    await this.loadSite();
    await this.loadImages();
    this.sitiosFiltrados = this.sitios
    
   }


  updatePlaces(filteredPlaces: cardsHome[]) {
    this.sortedCards = filteredPlaces;

    const idsFiltrados = filteredPlaces.map(p => p.id);
    this.sitiosFiltrados = this.sitios.filter(s => idsFiltrados.includes(s.id));
}

}
