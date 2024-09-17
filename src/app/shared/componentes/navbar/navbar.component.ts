import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  public estaLogueado: boolean = false;
  public username: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.estaAutenticado().subscribe(autenticado => {
      this.estaLogueado = autenticado;
    });
    this.authService.obtenerEmail().subscribe(email => {
      this.username = email?.split("@")[0] ?? "";;
    });
  };

  cerrarSesion() {
    this.authService.cerrarSesion()
    .then(() => console.log("Sesión cerrada con éxito"))
    .catch(() => console.log("Hubo un error al cerrar sesión"));
  }
}
