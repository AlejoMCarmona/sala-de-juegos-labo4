import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { obtenerFechaYHoraActual } from '../../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {

  constructor(private _firestore: Firestore) { }

  public enviarEncuesta(data: any) {
    const col = collection(this._firestore, 'encuestas');
    data.fecha = obtenerFechaYHoraActual();
    return addDoc(col, data);
  }
}
