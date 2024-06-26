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
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardClientComponent
      },
      {
        path: 'photographe',
        component: DashboardPhotographerComponent,
        canActivate: [authGuardGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'messages',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
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
        canActivate: [authGuardGuard]
      },
      {
        path: 'galerie',
        component: GalerieComponent,
        canActivate: [authGuardGuard]
      },
      {
        path: 'admin',
        component: DashboardComponent,
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

  { path: '**', redirectTo: 'dashboard' }
];
