import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';
import { DashboardPhotographerComponent } from './views/dashboard-photographer/dashboard-photographer.component';
import { DashboardComponent } from './views/dashboard-admin/dashboard.component';
import { ProfileComponent } from './Photographe/profile/profile.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { routeGuard } from './Auth/Guard/route.guard';
import { adminGuardGuard } from './Auth/Guard/admin-guard.guard';
import { authGuardGuard } from './Auth/Guard/auth-guard.guard';

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
        path: 'admin',
        component: DashboardComponent,
        canActivate: [adminGuardGuard],
      },
      {
        path: 'search',
        component: SearchComponent,
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];
