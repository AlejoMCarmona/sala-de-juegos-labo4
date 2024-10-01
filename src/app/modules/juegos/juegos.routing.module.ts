import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { QueNumeroEsComponent } from './que-numero-es/que-numero-es.component';

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
  },
  {
    path: 'que-numero-es',
    component: QueNumeroEsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JuegosRoutingModule { }