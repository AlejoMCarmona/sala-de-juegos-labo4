import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../services/mensajes.service';

@Component({
  selector: 'que-numero-es',
  templateUrl: './que-numero-es.component.html',
  styleUrls: ['./que-numero-es.component.css'],
})
export class QueNumeroEsComponent implements OnInit {
  public estaLogueado: boolean = true;
  public numero!: number;
  public numeroOculto: boolean = true;
  public numeroMayor!: number;
  public numeroMenor!: number;
  public puntuacion!: number;
  public vidas!: number;

  // Pistas:
  public pistas = [
    {
      id: 1,
      descubierta: false,
      textoOculto: 'Obtener divisibilidad',
      texto: '',
    },
    {
      id: 2,
      descubierta: false,
      textoOculto: 'Obtener paridad',
      texto: '',
    },
    {
      id: 3,
      descubierta: false,
      textoOculto: 'Sumar sus dígitos',
      texto: '',
    },
    {
      id: 4,
      descubierta: false,
      textoOculto: '¿Es un número primo?',
      texto: '',
    },
    {
      id: 5,
      descubierta: false,
      textoOculto: 'Restar sus digitos',
      texto: '',
    },
    {
      id: 6,
      descubierta: false,
      textoOculto: 'Entre 2 números',
      texto: '',
    },
  ];

  constructor(private _mensajeService: MensajesService) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  private iniciarJuego() {
    this.numero = this.generarNumeroAleatorio(1, 100);
    console.log(this.numero);
    this.numeroOculto = true;
    this.numeroMenor = this.crearNumeroMenor(this.numero);
    this.numeroMayor = this.crearNumeroMayor(this.numero);
    this.puntuacion = 50;
    this.vidas = 3;
    this.reiniciarPistas();
  }

  private reiniciarPistas() {
    this.pistas.forEach((pista) => {
      pista.descubierta = false;
      pista.texto = '';
    });
  }

  private generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private crearNumeroMenor(num: number): number {
    return Math.floor(Math.random() * (num - 1)) + 1;
  }

  private crearNumeroMayor(num: number): number {
    return Math.floor(Math.random() * (100 - num)) + num + 1;
  }

  private obtenerDivisible(num: number): number {
    if (num <= 1) return num;

    for (let i = 2; i <= num; i++) {
      if (num % i === 0) {
        return i;
      }
    }

    return num;
  }

  private sumarDigitos(num: number) {
    let suma = 0;
    while (num > 0) {
      suma += num % 10;
      num = Math.floor(num / 10);
    }
    return suma;
  }

  private restarDigitos(num: number) {
    const digitos = num.toString().split('').map(Number);
    return digitos.reduce((acumulador, valorActual) => acumulador - valorActual);
  }

  private esPrimo(num: number): boolean {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
  
    return true;
  }

  public obtenerPista(numeroPista: number) {
    if (this.puntuacion < 15) {
      this._mensajeService.lanzarNotificacionError("No tienes suficientes puntos", 1000);
      return;
    }

    const pista = this.pistas.find((p) => p.id === numeroPista);
    if (!pista) return;

    switch (numeroPista) {
      case 1:
        pista.texto = `Es divisible por ${this.obtenerDivisible(this.numero)}`;
        break;
      case 2:
        pista.texto = `Es ${this.esPar(this.numero)}`;
        break;
      case 3:
        pista.texto = `La suma de sus digitos da ${this.sumarDigitos(this.numero)}`;
        break;
      case 4:
        pista.texto = this.esPrimo(this.numero) ? "Es un número primo" : "No es un número primo";
        break;
      case 5:
        pista.texto = `La resta de sus digitos da ${this.restarDigitos(this.numero)}`;
        break;
      case 6:
        pista.texto = `Es menor que ${this.crearNumeroMayor(this.numero)} y mayor que ${this.crearNumeroMenor(this.numero)}`;
      break;
      default:
        pista.texto = 'No se ha desbloqueado ninguna pista';
      break;
    }
    this.puntuacion -= 15;
    pista.descubierta = true;
  }

  private esPar(num: number): string {
    return num % 2 === 0 ? 'par' : 'impar';
  }

  public adivinarNumero(input: HTMLInputElement) {
    const numeroEntero = Number(input.value);
    input.value = '';
    
    if (numeroEntero == 0) {
      this._mensajeService.lanzarNotificacionErrorCentro("Debes colocar un número válido (entre 1 y 100)", 1000);
      return;
    }

    if(this.numero === numeroEntero) {
      this.puntuacion += 50;
      this._mensajeService.lanzarNotificacionExitoCentro("¡Felicitaciones! El número era " + this.numero, 1500);
      if(this.vidas < 6) this.vidas++;
      this.reiniciarNumero();
    } else {
      this.vidas -= 1;
      if (this.vidas == 0) {
        this._mensajeService.lanzarMensajeError("GAME OVER", `Te quedaste sin vidas. Tu puntuación final fue de ${this.puntuacion} puntos. El número era el ${this.numero}`);
        this.iniciarJuego();
        return;
      } 
      this._mensajeService.lanzarNotificacionErrorCentro("Error, no es el número " + numeroEntero, 1500);
    }
  }

  private reiniciarNumero() {
    this.numero = this.generarNumeroAleatorio(1, 100);
    this.reiniciarPistas();
    this.numeroMayor = this.crearNumeroMayor(this.numero);
    this.numeroMenor = this.crearNumeroMenor(this.numero);
  }
}
