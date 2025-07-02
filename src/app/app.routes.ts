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
                import('./monument-list/monument-list.component').then(m => m.MonumentListComponent)
           },
           {
            path: ':id', 
            loadComponent: () =>
                import('./monument/monument.component').then(m => m.MonumentComponent)


            }
        ]
    
    },   
    
    
    {
        path: 'maps', 
        loadComponent: () =>
                import('./map/map.component').then(m => m.MapComponent)


    },
    {
        path: 'eventos', 
        loadComponent: () =>
                import('./event-card-list/event-card-list.component').then(m => m.EventCardListComponent)
    }, 
    
];
