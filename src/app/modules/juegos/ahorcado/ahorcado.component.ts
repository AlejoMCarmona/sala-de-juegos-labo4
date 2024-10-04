import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MensajesService } from '../../../services/mensajes.service';
import { PuntuacionService } from '../../../services/puntuacion.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent implements OnInit {
  private palabras: string[] = ['ELEFANTE', 'CONEJO', 'JIRAFA', 'LEON', 'SERPIENTE', 'CANGREJO', 'TIBURON', 'ARDILLA', 'GORILA', 'HORMIGA', 'AGUILA', 'CULEBRA', 'DROMEDARIO', 'FOCA', 'DELFIN', 'PINGUINO', 'PAVO', 'TORO', 'CABALLO', 'BURRO'];
  private palabraElegida: string = '';
  public palabraOculta: string = '';
  public letras: string[] = 'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('');
  public letrasDeshabilitadas: Set<string> = new Set();
  public intentosRestantes!: number;
  public puntuacion!: number;
  public estaLogueado: boolean = false;
  private rutaUrlImagenes: string = "assets/ahorcado/";
  public urlImagenActual: string = "";

  constructor(private auth: AuthService, private _mensajeService: MensajesService, private _puntuacionService: PuntuacionService) {
  }

  ngOnInit(): void {
    this.auth.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
      if(!this.estaLogueado) return;

      this.iniciarJuego();
    });
  }

  public iniciarJuego() {
    this.reiniciarJuego();
    this.puntuacion = 0;
  }

  public adivinarLetra(letra: string) {
    let nuevaPalabraOculta = this.palabraOculta.split(' ');
    let coincidencia = false;
    
    for (let i = 0; i < this.palabraElegida.length; i++) {
      if (this.palabraElegida[i] === letra) {
        nuevaPalabraOculta[i] = letra;
        coincidencia = true;
      }
    }

    this.palabraOculta = nuevaPalabraOculta.join(' ');
    this.deshabilitarLetra(letra);

    if (coincidencia) {
      this.puntuacion += 20;
      if (!this.palabraOculta.includes('_')) {
        this._mensajeService.lanzarNotificacionExitoCentro(`¡Felicidades! Has adivinado la palabra ${this.palabraElegida}`, 1500)
        this.reiniciarJuego();
      }
    } else {
      this.intentosRestantes--;
      if (this.puntuacion >= 5) this.puntuacion -= 5;
      this.urlImagenActual = this.rutaUrlImagenes + "ahorcado-" + this.intentosRestantes + ".png";
      if (this.intentosRestantes == 0) {
        this._mensajeService.lanzarMensajeError("GAME OVER", "La palabra era '" + this.palabraElegida + "'. Tu puntuación final fue de " + this.puntuacion + " puntos.");
        this._puntuacionService.subirPuntuacion(this.puntuacion, "ahorcado");
        this.iniciarJuego();
      }
    }
  }

  public reiniciarJuego() {
    this.palabraElegida = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_'.repeat(this.palabraElegida.length).split('').join(' ');
    this.intentosRestantes = 7;
    this.urlImagenActual = this.rutaUrlImagenes + "ahorcado-" + this.intentosRestantes + ".png";
    this.letrasDeshabilitadas.clear();
  }

  public deshabilitarLetra(letra: string) {
    this.letrasDeshabilitadas.add(letra);
  }
}