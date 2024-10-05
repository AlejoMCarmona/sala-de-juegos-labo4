import { Component, Input, OnInit } from '@angular/core';
import { PuntuacionJuego } from '../interfaces/puntuacion.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'tablero-puntuaciones',
  templateUrl: './tablero-puntuaciones.component.html',
  styleUrl: './tablero-puntuaciones.component.css'
})

export class TableroPuntuacionesComponent implements OnInit {
  @Input() puntuacionJuego!: PuntuacionJuego;
  public userEmail!: string;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.obtenerEmailUsuario().then(email => {
      this.userEmail = email;
    });
  }
}
