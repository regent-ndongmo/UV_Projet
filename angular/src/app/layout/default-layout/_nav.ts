import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Accueil',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
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
  // {
  //   title: true,
  //   name: 'Extras'
  // }
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     // {
  //     //   name: 'Error 404',
  //     //   url: '/404',
  //     //   icon: 'nav-icon-bullet'
  //     // },
  //     // {
  //     //   name: 'Error 500',
  //     //   url: '/500',
  //     //   icon: 'nav-icon-bullet'
  //     // }
  //   ]
  // }
];
