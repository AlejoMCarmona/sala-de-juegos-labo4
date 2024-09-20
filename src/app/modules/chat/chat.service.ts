import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private mensajesSubject = new BehaviorSubject<any[]>([]);

  constructor(private firestore: Firestore, private auth: Auth) { }

  public obtenerMensajes() {
    const colRef = collection(this.firestore, 'mensajes'); 
    const consulta = query(colRef, orderBy('fecha', 'asc'));  
    onSnapshot(consulta, (snapshot) => {
      let mensajes = snapshot.docs.map(doc => doc.data());
      this.mensajesSubject.next(mensajes); 
    });
    return this.mensajesSubject.asObservable();
  }

  public enviarMensaje(mensaje: string) {
    const col = collection(this.firestore, 'mensajes');

    const data = {
      email: this.auth.currentUser?.email,
      mensaje: mensaje,
      fecha: this.obtenerFechaYHoraActual()
    };

    addDoc(col, data)
    .catch(() => console.log("El mensaje no pudo ser enviado correctamente"));
  }

  private obtenerFechaYHoraActual(): string {
    const fechaActual = new Date();
  
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const horas = String(fechaActual.getHours()).padStart(2, '0'); 
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
  
    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
  }
}