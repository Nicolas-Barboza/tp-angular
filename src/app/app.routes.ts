import { Routes } from '@angular/router';
import { Punto1Component } from './punto1/punto1.component';
import { Punto2Component } from './punto2/punto2.component';
import { Punto3Component } from './punto3/punto3.component';
import { Punto4Component } from './punto4/punto4.component';

export const routes: Routes = [
  { path: 'punto1', component: Punto1Component },
  { path: 'punto2', component: Punto2Component },
  { path: 'punto3', component: Punto3Component },
  { path: 'punto4', component: Punto4Component },
  { path: '', redirectTo: '/punto1', pathMatch: 'full' }
];