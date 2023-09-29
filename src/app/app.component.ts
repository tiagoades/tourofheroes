import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

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

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void{
    this.authService.logout();
  }


}
