import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MensajesService } from '../../../services/mensajes.service';

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

  constructor(private auth: AuthService, private _mensajeService: MensajesService) {
    this.iniciarJuego();
  }

  ngOnInit(): void {
    this.auth.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
    });
  }

  public iniciarJuego() {
    this.palabraElegida = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_'.repeat(this.palabraElegida.length).split('').join(' ');
    this.intentosRestantes = 7;
    this.urlImagenActual = this.rutaUrlImagenes + "ahorcado-" + this.intentosRestantes + ".png";
    this.puntuacion = 0;
    this.letrasDeshabilitadas.clear();
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
    console.log("Deshabilitando...");
    this.deshabilitarLetra(letra);
    console.log("Resultado has: " + this.letrasDeshabilitadas.has(letra));

    if (coincidencia) {
      this.puntuacion += 10; // +10 puntos por letra acertada
      if (!this.palabraOculta.includes('_')) {
        this._mensajeService.lanzarMensajeExitoso("¡Felicidades!", " Has adivinado la palabra: '" + this.palabraElegida + "'. Puntuación final: " + this.puntuacion + "." );
        this.iniciarJuego();
      }
    } else {
      this.intentosRestantes--;
      this.puntuacion -= 5; // Penalización de -5 puntos por intento fallido
      this.urlImagenActual = this.rutaUrlImagenes + "ahorcado-" + this.intentosRestantes + ".png";
      if (this.intentosRestantes == 0) {
        this._mensajeService.lanzarMensajeError("GAME OVER", "La palabra era '" + this.palabraElegida + "'");
        this.iniciarJuego();
      }
    }
  }

  public deshabilitarLetra(letra: string) {
    this.letrasDeshabilitadas.add(letra);
  }
}