import { NavService } from './navService/nav.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { filter } from 'rxjs';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent {
  public navItems: INavData[] = [];

  constructor(
    private router: Router,
    private menuService: NavService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMenu();
    });

    this.menuService.getMenuItems().subscribe(items => {
      this.navItems = items;
    });

    this.updateMenu();
  }

  updateMenu() {
    const route = this.router.url.split('/')[1];
    let items: INavData[];

    switch (route) {
      case 'dashboard':
        items = navItems.filter(item => item.url === '/dashboard' || item.url === '/messages' || item.url === '/login' || item.url === '/register');
        break;
      case 'messages':
        items = navItems.filter(item => item.url === '/dashboard' || item.url === '/messages' || item.url === '/login' || item.url === '/register');
        break;
      case 'widgets':
        items = navItems.filter(item => item.url === '/dashboard' || item.url === '/messages' || item.url === '/login' || item.url === '/register');
        break;
      case 'login':
        items = navItems.filter(item => item.url === '/dashboard' || item.url === '/messages' || item.url === '/login' || item.url === '/register');
        break;
      case 'register':
        items = navItems.filter(item => item.url === '/dashboard' || item.url === '/messages' || item.url === '/login' || item.url === '/register');
        break;
      default:
        items = navItems;
        break;
    }

    this.menuService.setMenuItems(items);
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
