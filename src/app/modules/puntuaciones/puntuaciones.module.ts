import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntuacionesComponent } from './puntuaciones/puntuaciones.component';
import { TableroPuntuacionesComponent } from './tablero-puntuaciones/tablero-puntuaciones.component';
import { PuntuacionesRoutingModule } from './puntuaciones.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PuntuacionesComponent,
    TableroPuntuacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PuntuacionesRoutingModule
  ],
  exports: [
    PuntuacionesComponent
  ]
})

export class PuntuacionesModule { }
