import { Injectable } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { AuthService } from './auth.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class PuntuacionService {
  private baseNombreColeccion: string = "puntuaciones";

  constructor(private _mensajeService: MensajesService, private _authService: AuthService, private _firestore: Firestore) { }

  public subirPuntuacion(puntuacion: number, nombreJuego: string) {
    this._authService.obtenerEmailUsuario().then(email => {
      const emailUsuario = email;

      const mensaje = {
        email: emailUsuario,
        puntuacion: puntuacion,
        fecha: new Date()
      }
  
      this._mensajeService.lanzarPreguntaCentro("¿Deseas subir tu puntuación?", `Usuario: ${emailUsuario}; Puntuación: ${puntuacion}`, "¡Por supuesto!", "No, gracias")
      .then(resultado => {
        if(resultado.isConfirmed) {
          this.subirDocumento(mensaje, nombreJuego)
          .then(() => {
            this._mensajeService.lanzarMensajeExitoso("Finalizado", "Tu puntuación fue subida con éxito");
          })
          .catch(() => {
            this._mensajeService.lanzarMensajeError("ERROR", "Hubo un error al subir tu puntuación");
          });
        } else {
          this._mensajeService.lanzarMensajeInformativo("Finalizado", "Tu puntuación no fue subida");
        }
      })
    });
  }

  private subirDocumento(data: object, nombreJuego: string) {
    const col = collection(this._firestore, `${this.baseNombreColeccion}_${nombreJuego}`);
    return addDoc(col, data);
  }
}
