import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard';
import { Veiculos } from './components/veiculos/veiculos';
import { Marcas } from './components/marcas/marcas';
import { Categorias } from './components/categorias/categorias';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'veiculos', component: Veiculos, canActivate: [AuthGuard, AdminGuard] },
  { path: 'marcas', component: Marcas, canActivate: [AuthGuard, AdminGuard] },
  { path: 'categorias', component: Categorias, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }