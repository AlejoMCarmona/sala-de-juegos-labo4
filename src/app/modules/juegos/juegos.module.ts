import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoJuegosComponent } from './listado-juegos/listado-juegos.component';
import { JuegosRoutingModule } from './juegos.routing.module';
import { RouterLink } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

@NgModule({
  declarations: [
    ListadoJuegosComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    RouterLink
  ],
  exports: [
    ListadoJuegosComponent
  ]
})

export class JuegosModule { }
