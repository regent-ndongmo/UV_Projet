import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private photographerItems: INavData[] = [
    {
      name: 'Accueil',
      url: '/photographe',
      iconComponent: { name: 'cil-home' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Categorie',
      url: '/galerie',
      iconComponent: { name: 'cil-puzzle' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Messages',
      url: '/messages',
      iconComponent: { name: 'cilEnvelopeOpen' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Rendez-Vous',
      url: '/rendez-vous',
      iconComponent: { name: 'cil-calendar' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'Profile',
      url: '/profile',
      iconComponent: { name: 'cil-user' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    // {
    //   name: 'Corbeille',
    //   url: '/corbeille',
    //   iconComponent: { name: 'cil-basket' },
    //   badge: {
    //     color: 'info',
    //     text: 'NEW'
    //   }

    // },
    {
      name: 'Parametre',
      url: '/widgets',
      iconComponent: { name: 'cil-settings' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    }
  ];

  private adminItems: INavData[] = [
    {
      name: 'Accueil',
      url: '/admin',
      iconComponent: { name: 'cil-home' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Categorie',
      url: '/galerie',
      iconComponent: { name: 'cil-puzzle' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Messages',
      url: '/messages',
      iconComponent: { name: 'cilEnvelopeOpen' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Rendez-Vous',
      url: '/rendez-vous',
      iconComponent: { name: 'cil-calendar' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'Profile',
      url: '/profile',
      iconComponent: { name: 'cil-user' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'Corbeille',
      url: '/corbeille',
      iconComponent: { name: 'cil-basket' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'Parametre',
      url: '/parametre',
      iconComponent: { name: 'cil-settings' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'Photoghaphes',
      url: '/listePhotographe',
      iconComponent: { name: 'cil-list' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    // {
    //   name: 'Photographes',
    //   url: '/base',
    //   iconComponent: { name: 'cil-puzzle' },
    //   children: [

    //     {
    //       name: 'Liste des photoghaphes',
    //       url: '/listePhotographe',
    //       icon: 'nav-icon-bullet'
    //     },
    //     {
    //       name: 'Liste de client',
    //       url: '/base/tables',
    //       icon: 'nav-icon-bullet'
    //     },
    //   ]
    // },


  ];

  private superAdminItems: INavData[] = [
    {
      name: 'Photographes',
      url: '/base',
      iconComponent: { name: 'cil-puzzle' },
      children: [

        {
          name: 'Liste des photoghaphes',
          url: '/base/cards',
          icon: 'nav-icon-bullet'
        },
        {
          name: 'Liste de client',
          url: '/base/tables',
          icon: 'nav-icon-bullet'
        },
      ]
    },

    {
      name: 'Parametre',
      url: '/widgets',
      iconComponent: { name: 'cil-settings' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    }
  ];
  private clientItems: INavData[] = [
    {
      name: 'Accueil',
      url: '/dashboard',
      iconComponent: { name: 'cil-home' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'login',
      url: '/login',
      iconComponent: { name: 'cil-user' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    },
    {
      name: 'register',
      url: '/register',
      iconComponent: { name: 'cil-user' },
      badge: {
        color: 'info',
        text: 'NEW'
      }

    }
  ];

  constructor() { }

  getMenuItems(role: string): INavData[] {
    switch (role) {
      case 'photographe':
        return this.photographerItems;
      case 'admin':
        return this.adminItems;
      case 'superAdmin':
        return this.superAdminItems;
      case 'client':
        return this.clientItems;
      default:
        return [];
    }
  }
}
