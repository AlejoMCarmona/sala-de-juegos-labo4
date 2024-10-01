import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from './services/preguntados.service';
import { Cca3Code } from './interfaces/cca3.interface';
import { Flags } from './interfaces/country.interface';
import { Options } from './interfaces/options.interface';
import { MensajesService } from '../../../services/mensajes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})

export class PreguntadosComponent implements OnInit {
  public estaLogueado: boolean = true;
  public banderaPais!: Flags;
  private codigosDePaises!: Cca3Code[];
  public opciones!: Options[];
  public puntuacion: number = 0;
  public ayudaUtilizada: boolean = false;

  constructor(private _preguntadosService: PreguntadosService, private _mensajesService: MensajesService, private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
      if(!this.estaLogueado) return;

      this._preguntadosService.obtenerCodigosDePaises().then(codigos => {
        this.codigosDePaises = codigos;
        this.iniciarJuego();
      });
    });
  }

  public iniciarJuego() {
    this.cambiarBandera();
    this.puntuacion = 0;
    this.ayudaUtilizada = false;
  }

  public async cambiarBandera() {
    this.opciones = this.elegirOpcionesAleatorias();
    const codigoPaisCorrecto = this.opciones.find(opc => opc.correctAnswer)?.cca3;
    this._preguntadosService.obtenerBanderaPais(codigoPaisCorrecto ?? "").then(bandera => {
      this.banderaPais = bandera.flags;
    });
  }

  private elegirOpcionesAleatorias() {
  const paisesMezclados = [...this.codigosDePaises].sort(() => Math.random() - 0.5);
  const paisesSeleccionados = paisesMezclados.slice(0, 4);
  const indiceCorrecto = Math.floor(Math.random() * 4);
  const opciones: Options[] = paisesSeleccionados.map((pais, index) => ({
    name: pais.name.common,
    cca3: pais.cca3,
    correctAnswer: index === indiceCorrecto,
    disabled: false
  }));

    return opciones;
  }

  public elegirBandera(opcionElegida: Options) {
    if (opcionElegida.correctAnswer) {
      this.puntuacion += 5;
      this.cambiarBandera();
      this._mensajesService.lanzarNotificacionExito("¡Bien hecho!", 1000);
      if (this.ayudaUtilizada) this.ayudaUtilizada = false;
    } else {
      const opcionCorrecta = this.opciones.find(opc => opc.correctAnswer);
      this._mensajesService.lanzarMensajeError("¡HAZ PERDIDO!", "La bandera era de " + opcionCorrecta?.name + ". Tu puntuación final fue de " + this.puntuacion + " puntos.");
      this.iniciarJuego();
    }
  }

  public deshabilitarOpcionErronea(): void {
    if (this.puntuacion < 3) {
      this._mensajesService.lanzarNotificacionError("No tienes puntos suficientes", 800);
      return;
    }
    const opcionesIncorrectas = this.opciones.filter(opcion => !opcion.correctAnswer);
    const indiceAleatorio = Math.floor(Math.random() * opcionesIncorrectas.length);
    opcionesIncorrectas[indiceAleatorio].disabled = true;
    this.ayudaUtilizada = true;
    this.puntuacion -= 3;
  }
}
