import { Routes } from '@angular/router';

export const routes: Routes = [   


    {
        path: '', 
        loadComponent: () =>
                import('./home/home.component').then(m => m.HomeComponent)


    },   
    {
        path: 'monuments', 
        loadComponent: () =>
                import('./monument-list/monument-list.component').then(m => m.MonumentListComponent)


    },   
    {
        path: 'events', 
        loadComponent: () =>
                import('./event-list/event-list.component').then(m => m.EventListComponent)


    },   
    
];
