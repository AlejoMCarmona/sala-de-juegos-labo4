import { Component, OnInit } from '@angular/core';
import { MayorOMenorService } from './services/mayor-o-menor.service';
import { Card } from './interfaces/cards.interface';
import { MensajesService } from '../../../services/mensajes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})

export class MayorOMenorComponent implements OnInit {
  public cartasJuego: Card[] = [];
  public urlMazo: string = 'assets/carta.jpg';
  public cartasTotales = 30;
  public cartaJugador?: Card;
  public siguienteCarta?: Card;
  public estaLogueado = true;
  public botonesDeshabilitados = false;
  public puntuacion: number = 0;
  
  constructor(private _mayorOMenorService: MayorOMenorService, private _mensajeService: MensajesService, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
      if (!this.estaLogueado) return;
      // Puede ser reemplazado por una llamada a la API real
      this._mayorOMenorService.obtenerMazoDeCartasSimulado(this.cartasTotales).then(response => {
        response.cards.forEach(c => {
          const valorCarta = Number(c.value);
          if (!isNaN(valorCarta)) {
            this.cartasJuego.push(c);
          }
        });
        this.iniciarJuego();
      });
    });

  }

  private iniciarJuego() {
    this.cartasJuego = this.mezclarCartas(this.cartasJuego); // Mezclar las cartas
    this.botonesDeshabilitados = false;
    this.cartasTotales = 30;
    this.puntuacion = 0;
    // Asignar la carta actual y la siguiente carta
    this.cartaJugador = this.cartasJuego.pop();
    this.siguienteCarta = this.cartasJuego.shift();
  }

  public elegirCarta(esMayor: boolean) {
    if (!this.siguienteCarta) return;

    const valorCartaSiguiente = Number(this.siguienteCarta.value);
    const valorCartaActual = Number(this.cartaJugador!.value);

    // Mostrar la siguiente carta y deshabilitar los botones por algunos segundos
    this.botonesDeshabilitados = true;
    const eleccionCorrecta = this.evaluarEleccion(valorCartaActual, valorCartaSiguiente, esMayor);
    if(eleccionCorrecta) this._mensajeService.lanzarNotificacionExito("¡Buena elección!", 1000);
    setTimeout(() => {
      if (eleccionCorrecta) {
        this.puntuacion += 5;
        if (this.cartasTotales > 1) {
          this.cartasTotales--;
        } else {
          // Si adivina todas las cartas
          this._mensajeService.lanzarMensajeExitoso('FELICITACIONES', '¡Haz adivinado todas las cartas! Puntuación final: ' + this.puntuacion + ' puntos.');
          this.iniciarJuego();
          return;
        }
      } else {
        // Si falla
        this._mensajeService.lanzarMensajeError('GAME OVER','No has adivinado el valor correcto. La carta era un ' + this.siguienteCarta!.value + '. Puntuación final: ' + this.puntuacion + ' puntos.', this.siguienteCarta!.image);
        this.iniciarJuego();
        return;
      }

      // Actualizar la carta del jugador y definir la nueva carta siguiente
      this.cartaJugador = this.siguienteCarta;
      this.siguienteCarta = this.cartasJuego.shift(); // Obtener la nueva carta siguiente
      this.botonesDeshabilitados = false;
    }, 1000);
  }

  private evaluarEleccion(primerValor: number, segundoValor: number, esMayor: boolean) {
    return (segundoValor > primerValor && esMayor) || (segundoValor < primerValor && !esMayor) || segundoValor === primerValor;
  }

  // Algoritmo de Fisher-Yates para mezclar cartas
  private mezclarCartas(cartas: Card[]): Card[] {
    const mazoMezclado = [...cartas];

    for (let i = mazoMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazoMezclado[i], mazoMezclado[j]] = [mazoMezclado[j], mazoMezclado[i]];
    }

    return mazoMezclado;
  }
}