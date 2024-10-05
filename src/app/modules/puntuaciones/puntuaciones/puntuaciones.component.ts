import { Component, OnInit } from '@angular/core';
import { Puntuacion, PuntuacionJuego } from '../interfaces/puntuacion.interface';
import { PuntuacionService } from '../puntuacion.service';

@Component({
  selector: 'puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrl: './puntuaciones.component.css'
})

export class PuntuacionesComponent implements OnInit {
  private juegos: string[] = [ "ahorcado", "mayor-o-menor", "preguntados", "que-numero-es"];
  public puntuacionesJuegos: PuntuacionJuego[] = [];

  constructor(private _puntuacionService: PuntuacionService) {}
  
  ngOnInit(): void {
    this.puntuacionesJuegos = this._puntuacionService.obtenerPuntuaciones(this.juegos, 5);
  }


}
