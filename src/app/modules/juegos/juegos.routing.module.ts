import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent
  },
  {
    path: 'mayor-o-menor',
    component: MayorOMenorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JuegosRoutingModule { }