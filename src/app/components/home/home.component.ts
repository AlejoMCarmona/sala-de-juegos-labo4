import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JuegosModule } from '../../modules/juegos/juegos.module';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, JuegosModule , NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  public estaLogueado!: boolean;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
    })
  };
}
