import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  public email!: string;
  public password!: string;
  public inicioExitoso!: boolean;

  constructor(private router: Router) {}

  public autocompletar() {
    this.email = 'admin@test.com';
    this.password = '12345';
  }

  public iniciarSesion() {
    if (this.email === 'admin@test.com' && this.password === '12345') {
      this.router.navigate(['juegos']);
    } else {
      this.lanzarError('Inicio de sesión fallido', 'Las credenciales ingresadas son incorrectas');
    }
  }

  private lanzarError(titulo: string, mensaje: string) {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: mensaje
    });
  }
}
