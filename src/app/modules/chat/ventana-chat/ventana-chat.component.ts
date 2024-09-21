import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ventana-chat',
  templateUrl: './ventana-chat.component.html',
  styleUrl: './ventana-chat.component.css'
})

export class VentanaChatComponent implements OnInit {
  public estaLogueado: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.estaAutenticado().then(resultado => {
      this.estaLogueado = resultado;
    });
  }


}
