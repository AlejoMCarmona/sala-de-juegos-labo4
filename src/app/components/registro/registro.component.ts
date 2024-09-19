import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private auth: Auth) {}

  public registrarUsuario() {
    if (this.validarCampos()) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['home']))
      .catch(error => {
        let mensaje = "";
        switch (error.code) {
          case 'auth/email-already-in-use':
            mensaje = "Ya existe un usuario registrado con ese correo electrónico";
          break;
          default:
            mensaje = "Hubo un error ineperado a la hora de crear el usuario. Por favor, inténtelo más tarde";
          break;
        }
        this.lanzarError("ERROR", mensaje);
      });
    }
  }

  private validarCampos(): boolean {
    if (!this.email || !this.password) {
      this.lanzarError('Campos incompletos', 'Por favor, completa todos los campos.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.email)) {
      this.lanzarError('Email inválido', 'Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    return true;
  }

  private lanzarError(titulo: string, mensaje: string) {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: mensaje
    });
  }
}
