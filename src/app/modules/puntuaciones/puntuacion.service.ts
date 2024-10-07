import { Injectable } from '@angular/core';
import { MensajesService } from '../../services/mensajes.service';
import { AuthService } from '../../services/auth.service';
import { addDoc, collection, Firestore, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';
import { Puntuacion, PuntuacionJuego } from './interfaces/puntuacion.interface';
import { obtenerFechaYHoraActual } from '../../shared/utils/utils';

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
        fecha: obtenerFechaYHoraActual()
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

  public obtenerPuntuaciones(nombreJuegos: string[], limite: number) {
    let puntuacionesJuegos: PuntuacionJuego[] = [];

    for (const nombre of nombreJuegos) {
      let puntuacionJuego: PuntuacionJuego = {
        nombreJuego: nombre,
        puntuacion: []
      }

      let colRef = collection(this._firestore, `${this.baseNombreColeccion}_${nombre}`);
      const q = query(colRef, orderBy("puntuacion", "desc"), limit(limite));

      getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          let puntuacion: Puntuacion = {
            email: data["email"],
            fecha: data["fecha"].slice(0, -3),
            puntuacion: data["puntuacion"]
          };
          puntuacionJuego.puntuacion.push(puntuacion);
        });
      })
      .catch(() => console.log("Hubo un error a la hora de obtener las puntuaciones del juego " + puntuacionJuego.nombreJuego));

      puntuacionesJuegos.push(puntuacionJuego);
    }

    return puntuacionesJuegos;
  }
}
