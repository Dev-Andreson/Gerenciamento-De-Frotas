import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Veiculos } from './components/veiculos/veiculos';
import { Marcas } from './components/marcas/marcas';
import { Categorias } from './components/categorias/categorias';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'veiculos', component: Veiculos, canActivate: [AuthGuard] },
  { path: 'marcas', component: Marcas, canActivate: [AuthGuard] },
  { path: 'categorias', component: Categorias, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
