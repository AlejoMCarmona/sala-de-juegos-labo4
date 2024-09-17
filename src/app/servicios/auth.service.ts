import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private auth: Auth) {}

  /**
   * Retorna un observable que indica si el usuario está autenticado o no.
   * @returns Observable<boolean> - true si el usuario está autenticado, false en caso contrario.
   */
  public estaAutenticado(): Observable<boolean> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next(true); // Emite true si el usuario está logueado
        } else {
          observer.next(false); // Emite false si no hay usuario
        }
      });
    });
  }

  /**
   * Retorna un observable que contiene el email del usuario autenticado.
   * @returns Observable<string | null> - Email del usuario si está logueado, null si no lo está.
   */
  public obtenerEmail(): Observable<string | null> {
    return new Observable((observer) => {
      // Escucha los cambios en el estado de autenticación del usuario
      onAuthStateChanged(this.auth, (user) => {
        if (user && user.email) {
          observer.next(user.email); // Emite el email del usuario si está logueado
        } else {
          observer.next(null); // Emite null si no hay usuario logueado
        }
      });
    });
  }

  /**
   * Cierra la sesión del usuario autenticado.
   * @returns Promise<void> - Promesa que se resuelve al cerrar sesión correctamente.
   */
  public cerrarSesion(): Promise<void> {
    return signOut(this.auth);
  }
}
