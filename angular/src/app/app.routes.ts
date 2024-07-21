import { RegisterClientComponent } from './views/dashboard-client/register/register.component';
import { NotFoundComponent } from './views/dashboard-client/search/not-found/not-found.component';
import { SearchComponent } from './views/dashboard-client/search/search.component';
import { TermsConditionComponent } from './Auth/register/terms-condition/terms-condition.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ResetPasswordComponent } from './Auth/login/forgot-password/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Auth/login/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './Auth/register/verification-code/verification-code.component';
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
    children: [
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
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
          {
            path: 'search',
            component: SearchComponent
          },
          {
            path: 'register-client',
            component: RegisterClientComponent
          },
          {
            path: '404',
            component: NotFoundComponent,
            data: {
              title: 'Page 404'
            }
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
        path: 'parametre',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes),
        canActivate: [adminGuardGuard],
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
        path: 'terms_condition',
        component: TermsConditionComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'verified_code',
        component: VerificationCodeComponent
      },
      {
        path: 'forgot_password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset_password',
        component: ResetPasswordComponent
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
        canActivate: [adminGuardGuard],
        data: {
          title: 'Corbeille'
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
        data: {
          title: 'Home'
        }
      },
      {
        path: 'listePhotographe',
        component: ListePhotographeComponent,
        canActivate: [adminGuardGuard],
      },
      {
        path: 'user-guide',
        component: UserGuideComponent
      }
    ]
  },

  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },

  { path: '**', redirectTo: '' }
];
