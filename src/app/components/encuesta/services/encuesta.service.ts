import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { obtenerFechaYHoraActual } from '../../../shared/utils/utils';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {

  constructor(private _firestore: Firestore, private _authService: AuthService) { }

  public async enviarEncuesta(data: any) {
    const col = collection(this._firestore, 'encuestas');
    data.fecha = obtenerFechaYHoraActual();
    data.email = await this._authService.obtenerEmailUsuario();
    return addDoc(col, data);
  }
}
