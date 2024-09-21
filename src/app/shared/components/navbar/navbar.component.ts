import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit, OnDestroy {
  public suscripciones: Subscription = new Subscription();
  public estaLogueado: boolean = false;
  public username: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.suscripciones.add(this.authService.obtenerEmailUsuarioObservable().subscribe(email => {
      this.estaLogueado = email != "";
      this.username = email != "" ? email.split("@")[0] : "";
    }));
  };
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
  }

  cerrarSesion() {
    this.authService.cerrarSesion()
    .then(() => console.log("Sesión cerrada con éxito"))
    .catch(() => console.log("Hubo un error al cerrar sesión"));
  }
}
