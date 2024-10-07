import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { obtenerFechaYHoraActual } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private mensajesSubject = new BehaviorSubject<any[]>([]);

  constructor(private firestore: Firestore, private auth: Auth) { }

  public obtenerMensajesObservable() {
    const colRef = collection(this.firestore, 'mensajes'); 
    const consulta = query(colRef, orderBy('fecha', 'asc'));  
    onSnapshot(consulta, snapshot => {
      const mensajes = snapshot.docs.map(doc => doc.data());
      this.mensajesSubject.next(mensajes);
    });
    return this.mensajesSubject.asObservable();
  }

  public enviarMensaje(mensaje: string) {
    const col = collection(this.firestore, 'mensajes');

    const data = {
      email: this.auth.currentUser?.email,
      mensaje: mensaje,
      fecha: obtenerFechaYHoraActual()
    };

    addDoc(col, data)
    .catch(() => console.log("El mensaje no pudo ser enviado correctamente"));
  }
}