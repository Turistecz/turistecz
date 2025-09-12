import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MonumentItem } from '../models/monument.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { MonumentServiceService } from '../services/monument-service.service';
import { MapComponent } from "../map/map.component";
import { EnumServiciosAdaptabilidad } from '../place-card-list/EnumServiciosAdaptabilidad';

@Component({
  selector: 'app-monument',
  standalone: true,
  imports: [CommonModule, RouterModule, MapComponent],
  templateUrl: './monument.component.html',
  styleUrl: './monument.component.css'
})
export class MonumentComponent implements OnInit {
   private route = inject(ActivatedRoute);

  constructor(private http: HttpClient, private apiConnectService: MonumentServiceService) {}

  monumentNumber: number = -1;
  monuments: MonumentItem[] = [];
  monumentsFiltered: MonumentItem[] = [];
  monumentsNames: string[] = [];

  adaptabilityCategories: any[] = [];


  monumento: MonumentItem = {
    id: 0,
    title: "",
    description: "",
    address: "",
    horario: "",
    phone: "",
    price: "",
    image: "",
    uri: "",
    imagenes: [
      {
        url: "",
        nombre: "",
        copy: "",
        id: 0
      }
    ],
    rampas: EnumServiciosAdaptabilidad.no_hay_informacion,
    ascensores: EnumServiciosAdaptabilidad.no_hay_informacion,
    puertas_automaticas: EnumServiciosAdaptabilidad.no_hay_informacion,
    escaleras_mecanicas: EnumServiciosAdaptabilidad.no_hay_informacion,
    servicios_adaptados: EnumServiciosAdaptabilidad.no_hay_informacion,
    sala_lactancia: EnumServiciosAdaptabilidad.no_hay_informacion,
    cambiador: EnumServiciosAdaptabilidad.no_hay_informacion,
    parking_adaptado: EnumServiciosAdaptabilidad.no_hay_informacion,
    bancos: EnumServiciosAdaptabilidad.no_hay_informacion,
    mostrador_adaptado: EnumServiciosAdaptabilidad.no_hay_informacion,
    sin_barreras_arquitectonicas: EnumServiciosAdaptabilidad.no_hay_informacion,
    braille: EnumServiciosAdaptabilidad.no_hay_informacion,
    interprete_lengua_signos: EnumServiciosAdaptabilidad.no_hay_informacion,
    videos_subtitulos: EnumServiciosAdaptabilidad.no_hay_informacion,
    ayudas_visuales: EnumServiciosAdaptabilidad.no_hay_informacion,
    guias_turisticos_multiidioma: EnumServiciosAdaptabilidad.no_hay_informacion,
    elementos_audiovisuales_multiidioma: EnumServiciosAdaptabilidad.no_hay_informacion,
    documentacion_multiidioma: EnumServiciosAdaptabilidad.no_hay_informacion,
    visitas_grupales: EnumServiciosAdaptabilidad.no_hay_informacion,
    ayuda_movilidad: EnumServiciosAdaptabilidad.no_hay_informacion,
    lenguaje_simple: EnumServiciosAdaptabilidad.no_hay_informacion,
    acceso_perros_guias: EnumServiciosAdaptabilidad.no_hay_informacion,
    acceso_perros_asistencia: EnumServiciosAdaptabilidad.no_hay_informacion
  };

  coords = {
    latitud: 0,
    longitud: 0
  };

  async loadImages(): Promise<void> {
    const variableNumero = this.route.snapshot.paramMap.get('id'); 
    try {
      const datos = await firstValueFrom(this.http.get<any>(
        `http://localhost:8080/api/sitioCorrespondienteALaImagen?id=${variableNumero}`
      ));

      this.monumento = datos;
      this.coords = datos;

    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  async loadMonuments(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.apiConnectService.getMonuments());
      this.monuments = datos.result;
      this.apiConnectService.filterTopMonuments(this.monuments).subscribe(filtrados => {
        this.monumentsFiltered = filtrados;
      });
    
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

 async loadAdaptabilityCategories(): Promise<void> {
    this.adaptabilityCategories = []; // Limpiamos cada vez que se carga

    const mapping: Record<string, { icon: string; label: string }> = {
      rampas: { icon: "fa-wheelchair", label: "Rampas de acceso" },
      ascensores: { icon: "fa-elevator", label: "Ascensor" },
      puertas_automaticas: { icon: "fa-door-open", label: "Puertas automáticas" },
      escaleras_mecanicas: { icon: "fa-ellipsis-v", label: "Escaleras mecánicas" },
      servicios_adaptados: { icon: "fa-restroom", label: "Servicios adaptados" },
      sala_lactancia: { icon: "fa-baby", label: "Sala de lactancia" },
      cambiador: { icon: "fa-baby-carriage", label: "Cambiador" },
      parking_adaptado: { icon: "fa-parking", label: "Parking adaptado" },
      bancos: { icon: "fa-chair", label: "Bancos" },
      mostrador_adaptado: { icon: "fa-concierge-bell", label: "Mostrador adaptado" },
      sin_barreras_arquitectonicas: { icon: "fa-universal-access", label: "Sin barreras arquitectónicas" },
      braille: { icon: "fa-braille", label: "Información en braille" },
      interprete_lengua_signos: { icon: "fa-hands", label: "Intérprete lengua de signos" },
      videos_subtitulos: { icon: "fa-closed-captioning", label: "Vídeos con subtítulos" },
      ayudas_visuales: { icon: "fa-low-vision", label: "Ayudas visuales" },
      guias_turisticos_multiidioma: { icon: "fa-language", label: "Guías turísticos multiidioma" },
      elementos_audiovisuales_multiidioma: { icon: "fa-film", label: "Elementos audiovisuales multiidioma" },
      documentacion_multiidioma: { icon: "fa-book", label: "Documentación multiidioma" },
      visitas_grupales: { icon: "fa-users", label: "Visitas grupales" },
      ayuda_movilidad: { icon: "fa-walking", label: "Ayuda movilidad" },
      lenguaje_simple: { icon: "fa-comment", label: "Lenguaje simple" },
      acceso_perros_guias: { icon: "fa-dog", label: "Acceso perros guías" },
      acceso_perros_asistencia: { icon: "fa-dog", label: "Acceso perros de asistencia" }
    };

    for (const key in mapping) {
      const value = (this.monumento as any)[key];

      if (value === EnumServiciosAdaptabilidad.si) {
        this.adaptabilityCategories.push({
          icon: mapping[key].icon,
          label: mapping[key].label,
          info: false
        });
      } else if (value === EnumServiciosAdaptabilidad.bajo_peticion) {
        this.adaptabilityCategories.push({
          icon: mapping[key].icon,
          label: mapping[key].label,
          info: true
        });
      }
    }
}

  removeHTMLTags(text: string): string {
    return text ? text.replace(/<[^>]*>/g, '').trim() : "";
  }

  get cleanHorario(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].horario);
  }

  get cleanDescription(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].description);
  }

  get cleanPrice(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].price);
  }

  get img(): string {
    return this.monumento.imagenes[this.monumentNumber].url;
  }

  // Un solo ngOnInit combinando las dos tareas
  async ngOnInit(): Promise<void> {
    await this.loadImages();
    await this.loadMonuments();
    await this.loadAdaptabilityCategories();
   
    this.apiConnectService.getMonumentsNames().subscribe(data => {
      data.map(monumento => this.monumentsNames.push(monumento.nombre));
    });  

    this.monumentNumber = Number(this.route.snapshot.paramMap.get('id'));
    this.monumentNumber--;
  }
}