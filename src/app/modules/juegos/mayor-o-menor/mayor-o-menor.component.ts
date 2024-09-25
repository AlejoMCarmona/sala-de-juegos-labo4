import { Component, OnInit } from '@angular/core';
import { MayorOMenorService } from './services/mayor-o-menor.service';
import { Card } from './interfaces/cards.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})

export class MayorOMenorComponent implements OnInit {
  public cartasJuego: Card[] = [];
  public cartasTotales = 30;
  public cartaJugador?: Card;
  public estaLogueado = true; // IMPLEMENTAR
  public botonesDeshabilitados = false;
  private puntuacion: number = 0;
  
  constructor(private _mayorOMenorService : MayorOMenorService) {}

  ngOnInit() {
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
  }

  public iniciarJuego() {
    this.cartasJuego = this.mezclarCartas(this.cartasJuego); // Mezclo las cartas
    this.cartasTotales = 30;
    this.cartasTotales--;
    this.puntuacion = 0;
    this.cartaJugador = this.cartasJuego.pop();
  }

  public eleccion(esMayor: boolean) {
    const cartaSiguiente = this.cartasJuego.shift()!; 
    this.cartasJuego.push(this.cartaJugador!);
    const valorCartaSiguiente = Number(cartaSiguiente.value);
    const valorCartaActual = Number(this.cartaJugador!.value);

    if(  (valorCartaSiguiente > valorCartaActual && esMayor) 
      || (valorCartaSiguiente < valorCartaActual && !esMayor)
      || (valorCartaSiguiente === valorCartaActual)) {
      this.puntuacion += 5;

      if(this.cartasTotales != 0){
        this.cartasTotales--;
      } else if (this.cartasTotales == 0) { // SI GANA EL JUEGO
        this.lanzarMensaje('FELICITACIONES', '¡Haz adivinado todas las cartas! Puntuación final: ' + this.puntuacion + " puntos.", false);
        this.cartasJuego.push(cartaSiguiente!); // TODO: corregir lógica
        // TODO: subir puntuacion     
        // this.puntuacionService.guardarPuntuacion("mayor-o-menor", this.points);
        this.iniciarJuego();
        return;
      }
    } else { // SI PIERDE EL JUEGO
      this.lanzarGameOver('GAME OVER', 'No has adivinado el valor correcto. La carta era un ' + cartaSiguiente.value + '. Puntuación final: ' + this.puntuacion + ' puntos.', cartaSiguiente.image);
      this.cartasJuego.push(cartaSiguiente!); // TODO: corregir lógica
      this.iniciarJuego();
      // TODO: subir puntuacion     
      // this.puntuacionService.guardarPuntuacion("mayor-o-menor", this.points);
      return;
    }
    
    this.cartaJugador = cartaSiguiente;
  }

  private mezclarCartas(cartas: Card[]): Card[] {
    const mazoMezclado = [...cartas];
  
    // Algoritmo de Fisher-Yates
    for (let i = mazoMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazoMezclado[i], mazoMezclado[j]] = [mazoMezclado[j], mazoMezclado[i]];
    }
  
    return mazoMezclado; 
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

  private lanzarGameOver(titulo: string, mensaje: string, imagenCarta: string) {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: mensaje,
      imageUrl: imagenCarta
    });
  }
}