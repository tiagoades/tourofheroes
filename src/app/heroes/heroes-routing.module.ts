import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: ':id', component: HeroDetailComponent,
    canActivate: [authGuard]
  },
  { path: '', component: HeroesComponent,
    canActivate: [authGuard]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HeroesRoutingModule { }
