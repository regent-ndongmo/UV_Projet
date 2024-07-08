import { NavService } from './navService/nav.service';
import { Component, OnInit } from '@angular/core';
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
import { filter } from 'rxjs';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { CommonModule } from '@angular/common';

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
    DefaultFooterComponent,
    CommonModule
  ]
})
export class DefaultLayoutComponent implements OnInit{


  public navItems: INavData[] = [];

  role = this.service.getRole();
  isVisible: boolean = false

  constructor(
    private router: Router,
    private menuService: NavService,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMenu();
    });

    this.updateMenu();

    this.isVisible = this.service.isAuthenticated();

  }

  updateMenu() {
    const role = this.service.getRole();
    if (role === "superAdmin") {
      this.navItems = this.menuService.getMenuItems(role);
    }
    if (role === "admin") {
      this.navItems = this.menuService.getMenuItems(role);
    }
    if (role === "photographe") {
      this.navItems = this.menuService.getMenuItems(role);
    }
    if (role === "client") {
      this.navItems = this.menuService.getMenuItems(role);
    }



  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
  trackByIndex(index: number){
    // return index;
  }
}
