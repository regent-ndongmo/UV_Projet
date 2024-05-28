import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private menuItems = new BehaviorSubject<INavData[]>([]);

  setMenuItems(items: INavData[]) {
    this.menuItems.next(items);
  }

  getMenuItems() {
    return this.menuItems.asObservable();
  }
  
  constructor() { }
}
