import { Routes } from '@angular/router';

export const routes: Routes = [   


    {
        path: '', 
        loadComponent: () =>
                import('./home/home.component').then(m => m.HomeComponent),      
    },   
    {
        path: 'sitios',     
        children: [
   { 
            path: '',
            loadComponent: () =>
                import('./place-card-list/place-card-list.component').then(m => m.PlaceCardListComponent),
    },
    {
            path: ':id', 
            loadComponent: () =>
                import('./monument/monument.component').then(m => m.MonumentComponent),
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
                import('./event-card-list/event-card-list.component').then(m => m.EventCardListComponent),     
    }, 
    {
        path: 'signin', 
        loadComponent: () =>
                import('./sign-form/sign-form.component').then(m => m.SignformComponent)
    },   
    {
    path: 'login', 
        loadComponent: () =>
                import('./login/login.component').then(m => m.LoginComponent)

    },  
    {
    path: 'mi-perfil', 
        loadComponent: () =>
                import('./mi-perfil/mi-perfil.component').then(m => m.MiPerfilComponent)
    }, 
    {
    path: 'alojamientos', 
        loadComponent: () =>
                import('./accommodation/accommodation.component').then(m => m.AccommodationComponent),
    },
    {
    path: 'restaurantes', 
        loadComponent: () =>
                import('./gastronomy/gastronomy.component').then(m => m.GastronomyComponent),
    },


    {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./recuperar-contrasena/recuperar-contrasena.component').then(m => m.RecuperarContrasenaComponent)
    },
    {
  path: 'rutas',
  children: [
    {
      path: '',
      loadComponent: () =>
        import('./page-routes/page-routes.component').then(m => m.pageRoutesComponent),
    },
    {
      path: ':id',
      loadComponent: () =>
        import('./detail-route/detail-route.component').then(m => m.DetailRouteComponent),
    }
      ]
   },

    {
      path: 'mapa', 
          loadComponent: () =>
          import('./map-page/map-page.component').then(m => m.MapPageComponent)
    },
    {
     path: 'reset-password', 
     loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)   
    },
    {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent)
    },
    /*El not-found siempre va de último*/ 
    {
      path: '**',
      loadComponent: () =>
        import('./not-found/not-found.component').then(m => m.NotFoundComponent),
      data: { breadcrumb: 'Error 404' }
    }, 
]
