import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../services/mensajes.service';

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

  constructor(private router: Router, private auth: Auth, private _mensajeService: MensajesService) {}

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
        this._mensajeService.lanzarMensajeError("ERROR", mensaje);
      });
    }
  }

  private validarCampos(): boolean {
    if (!this.email || !this.password) {
      this._mensajeService.lanzarMensajeError('Campos incompletos', 'Por favor, completa todos los campos.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.email)) {
      this._mensajeService.lanzarMensajeError('Email inválido', 'Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    return true;
  }
}
