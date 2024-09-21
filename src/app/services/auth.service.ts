import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usuarioAutenticado: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public estaLogueado: boolean = false;

  constructor(private auth: Auth) {}

  /**
   * Retorna un observable que contiene el email del usuario autenticado.
   * @returns Observable<string> - Email del usuario si está logueado, o una cadena vacía si no lo está.
   */
  public obtenerEmailUsuarioObservable(): Observable<string> {
      // Escucha los cambios en el estado de autenticación del usuario
    onAuthStateChanged(this.auth, user => {
      if (user && user.email) {
        this.estaLogueado = true;
        this.usuarioAutenticado.next(user.email);
      } else {
        this.estaLogueado = false;
        this.usuarioAutenticado.next("");
      }
    });
    return this.usuarioAutenticado.asObservable();
  }

  public estaAutenticado(): Promise<boolean> {
    return new Promise(resolve => {
      onAuthStateChanged(this.auth, user => {
        resolve(!!user);
      });
    });
  }

  public obtenerEmailUsuario(): Promise<string> {
    return new Promise(resolve => {
      onAuthStateChanged(this.auth, user => {
        if (user && user.email) {
          resolve(user.email);
        } else {
          resolve("");
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
