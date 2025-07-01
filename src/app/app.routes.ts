import { pageRoutesComponent } from './page-routes/page-routes.component';
import { Routes } from '@angular/router';

export const routes: Routes = [   


    {
        path: '', 
        loadComponent: () =>
                import('./home/home.component').then(m => m.HomeComponent)
    


    },   
       
    {
        path: 'sitios', 
        children: [
           { 
            path: '',
            loadComponent: () =>
                import('./place-card-list/place-card-list.component').then(m => m.PlaceCardListComponent)
           },
           {
            path: ':id', 
            loadComponent: () =>
                import('./monument/monument.component').then(m => m.MonumentComponent)


            }
        ]
    
    },   
    {
        path: 'eventos', 
        loadComponent: () =>
                import('./event-list/event-list.component').then(m => m.EventListComponent)


    }, 
    
    {
        path: 'maps', 
        loadComponent: () =>
                import('./map/map.component').then(m => m.MapComponent)


    },
    {
        path: 'event-card', 
        loadComponent: () =>
                import('./event-card-list/event-card-list.component').then(m => m.EventCardListComponent)
    }, 

    {
        path: 'rutas', 
        loadComponent: () =>
                import('./page-routes/page-routes.component').then(m => m.pageRoutesComponent)
    }, 
    
];
