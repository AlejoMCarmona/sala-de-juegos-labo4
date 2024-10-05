import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuntuacionesComponent } from './puntuaciones/puntuaciones.component'; 

const routes: Routes = [
  { path: '', component: PuntuacionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PuntuacionesRoutingModule { }