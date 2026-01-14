import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter,firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private http: HttpClient) {

 this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      });
  }

  private buildBreadcrumbs(
    ruta: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = []
  ): Array<{ label: string; url: string }> {
    let enlace = ruta.snapshot.url.map(seg => seg.path).join('/');

    if (enlace) {
      url += `/${enlace}`;
    }

    let label = ruta.snapshot.data['breadcrumb'];
    if (!label && enlace) {
      label = enlace.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    const id = ruta.snapshot.paramMap.get('id');

    //  sitios
    if (id && url.startsWith('/sitios')) {
      label = 'Detalle del sitio'; 
      this.loadSitioName(id).then(nombreReal => {
        const bc = this.breadcrumbs.find(b => b.url === url);
        if (bc) bc.label = nombreReal;
      });
    }

    //  ruta
    if (id && url.startsWith('/rutas')) {
      label = 'Detalle de ruta'; 
      this.loadRutaName(id).then(nombreReal => {
        const bc = this.breadcrumbs.find(b => b.url === url);
        if (bc) bc.label = nombreReal;
      });
    }

    if (label) {
      breadcrumbs.push({ label, url });
    }

    if (ruta.firstChild) {
      return this.buildBreadcrumbs(ruta.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private async loadSitioName(id: string): Promise<string> {
    try {
      const sitio = await firstValueFrom(
        this.http.get<any>(`http://localhost:8080/api/sitioCorrespondienteALaImagen?id=${id}`)
      );
      return sitio?.nombre ?? 'Detalle del sitio';
    } catch (e) {
      console.error('Error cargando nombre del sitio:', e);
      return 'Detalle del sitio';
    }
  }

  private async loadRutaName(id: string): Promise<string> {
  try {
    const rutas = await firstValueFrom(
      this.http.get<any[]>(`http://localhost:8080/api/rutas`) 
    );

    const ruta = rutas.find(r => String(r.id) === id);

    return ruta?.nombre ?? 'Detalle de ruta';

  } catch (e) {
    console.error('Error cargando nombre de la ruta:', e);
    return 'Detalle de ruta';
   }
 }
}
