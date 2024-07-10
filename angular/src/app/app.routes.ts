import { PhotographeListComponent } from './views/dashboard-client/photographe-list/photographe-list.component';
import { ListePhotographeComponent } from './Admin/liste-photographe/liste-photographe.component';
import { CategorieInfoComponent } from './views/dashboard-client/categorie-info/categorie-info.component';
import { LayoutComponent } from './views/dashboard-client/layout/layout.component';
import { InfoPhotographeComponent } from './views/dashboard-client/info-photographe/info-photographe.component';
import { ContratComponent } from './Photographe/rendez-vous/contrat/contrat.component';
import { RendezVousComponent } from './Photographe/rendez-vous/rendez-vous.component';
import { CategorieComponent } from './Photographe/galerie/categorie/categorie.component';
import { CorbeilleComponent } from './Photographe/corbeille/corbeille.component';
import { GalerieComponent } from './Photographe/galerie/galerie.component';
import { routeGuard } from './Auth/Guard/route.guard';
import { adminGuardGuard } from './Auth/Guard/admin-guard.guard';
import { DashboardComponent } from './views/dashboard-admin/dashboard.component';
import { ProfileComponent } from './Photographe/profile/profile.component';
import { authGuardGuard } from './Auth/Guard/auth-guard.guard';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';
import { DashboardPhotographerComponent } from './views/dashboard-photographer/dashboard-photographer.component';
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardClientComponent

          },
          {
            path: 'categorieN/:name',
            component: CategorieInfoComponent,
            data: {
              title: 'categorie'
            }
          },
          {
            path: 'listPhotographe',
            component: PhotographeListComponent
          },
        ]
      },

      {
        path: 'info-photographe/:id',
        component: InfoPhotographeComponent,
        data: {
          title: 'info-photographe'
        }
      },

      {
        path: 'photographe',
        component: DashboardPhotographerComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'Photographe'
        }
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'messages',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes),
        canActivate: [authGuardGuard],
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'profile'
        }
      },
      {
        path: 'galerie',
        component: GalerieComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'Galerie'
        }
      },
      {
        path: 'categorie/:id',
        component: CategorieComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'categorie'
        }
      },
      {
        path: 'corbeille',
        component: CorbeilleComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'Galerie'
        }
      },
      {
        path: 'rendez-vous',
        component: RendezVousComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'rendez-vous'
        }
      },
      {
        path: 'contrat',
        component: ContratComponent,
        canActivate: [authGuardGuard],
        data: {
          title: 'Contrat'
        }
      },
      {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [adminGuardGuard],
      },
      {
        path: 'listePhotographe',
        component: ListePhotographeComponent,
        canActivate: [adminGuardGuard],
      }
    ]
  },
  // {
  //   path: '404',
  //   loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },

  { path: '**', redirectTo: '' }
];
