import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

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

  constructor(private router: Router, private auth: Auth) {}

  public autocompletar() {
    this.email = 'admin@test.com';
    this.password = 'PASS12345';
  }

  public iniciarSesion() {
    if (this.email != "" && this.password != "") {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['home']))
      .catch(() => this.lanzarError('Inicio de sesión fallido', 'Las credenciales ingresadas son inválidas'));
    } else {
      this.lanzarError('ERROR', 'Debes completar todos los campos para iniciar sesión');
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
