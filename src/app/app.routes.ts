import { Routes } from '@angular/router';

export const routes: Routes = [   


    {
        path: '', 
        loadComponent: () =>
                import('./home/home.component').then(m => m.HomeComponent)
    


    },   
        {
        path: 'sitios/:id', 
        loadComponent: () =>
                import('./monument/monument.component').then(m => m.MonumentComponent)


    }, 
    {
        path: 'sitios', 
        loadComponent: () =>
                import('./monument-list/monument-list.component').then(m => m.MonumentListComponent)


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
    
    
];
