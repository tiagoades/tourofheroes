import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';

  menuItens: MenuItem[] = [
    {
      icon:'dashboard',
      toolTipText: 'Dashboard',
      routerLink: '/dashboard',

    },
    {
      icon:'sports_martial_arts',
      toolTipText: 'Heroes',
      routerLink: '/heroes',
    }
  ]
}
