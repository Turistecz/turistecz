import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    let buildBreadcrumbs = (
      ruta: ActivatedRoute,
      url: string = '',
      breadcrumbs: Array<{ label: string; url: string }> = []
    ): Array<{ label: string; url: string }> => {

      let enlace = ruta.snapshot.url.map(seg => seg.path).join('/');

      if (enlace) {
        url += `/${enlace}`;
      }

      let label = ruta.snapshot.data['breadcrumb'];
      if (!label && enlace) {
        label = enlace.charAt(0).toUpperCase() + enlace.slice(1);
      }

      if (label) {
        breadcrumbs.push({ label, url });
      }

      if (ruta.firstChild) {
        return buildBreadcrumbs(ruta.firstChild, url, breadcrumbs);
      }

      return breadcrumbs;
    };
    
    this.breadcrumbs = buildBreadcrumbs(this.activatedRoute.root);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = buildBreadcrumbs(this.activatedRoute.root);
      });
  }
}