import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';

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

  constructor(private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.username = user.email?.split("@")[0] ?? "";
        this.estaLogueado = true;
      } else {
        this.estaLogueado = false;
      }
    });
  };

  cerrarSesion() {
    signOut(this.auth)
    .then(() => {
      this.estaLogueado = false;
      console.log("SESIÓN CERRADA");
    })
  }
}
