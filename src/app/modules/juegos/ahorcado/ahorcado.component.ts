import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent implements OnInit {
  private palabras: string[] = ['ELEFANTE', 'CONEJO', 'JIRAFA', 'LEON', 'SERPIENTE', 'CANGREJO', 'TIBURON', 'ARDILLA', 'GORILA', 'HORMIGA', 'AGUILA', 'CULEBRA', 'DROMEDARIO', 'FOCA', 'DELFIN', 'PINGUINO', 'PAVO', 'TORO', 'CABALLO', 'BURRO'];
  private palabraElegida: string = '';
  public palabraOculta: string = '';
  public letras: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  public intentosRestantes!: number;
  public puntos!: number;
  public estaLogueado: boolean = false;

  constructor(private auth: AuthService) {
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
    this.puntos = 0;
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

    if (coincidencia) {
      this.puntos += 10; // +10 puntos por letra acertada
      if (!this.palabraOculta.includes('_')) {
        this.lanzarMensaje("¡Felicidades!", " Has adivinado la palabra: '" + this.palabraElegida + "'", false);
        this.iniciarJuego();
      }
    } else {
      this.intentosRestantes--;
      this.puntos -= 5; // Penalización de -5 puntos por intento fallido
      if (this.intentosRestantes == 0) {
        this.lanzarMensaje("GAME OVER", "La palabra era '" + this.palabraElegida + "'");
        this.iniciarJuego();
      }
    }
  }

  private lanzarMensaje(titulo: string, mensaje: string, error: boolean = true) {
    if (error) {
      Swal.fire({
        icon: "error",
        title: titulo,
        text: mensaje
      });
    } else {
      Swal.fire({
        icon: "success",
        title: titulo,
        text: mensaje
      });
    }
  }
}