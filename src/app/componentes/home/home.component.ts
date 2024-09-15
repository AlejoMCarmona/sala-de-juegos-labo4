import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JuegosModule } from '../../modulos/juegos/juegos.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, JuegosModule , NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  public estaLogueado!: boolean;

  constructor (private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.estaLogueado = true;
      } else {
        this.estaLogueado = false;
      }
    });
  };
}
