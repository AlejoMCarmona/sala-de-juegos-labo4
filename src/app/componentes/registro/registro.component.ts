import { Component } from '@angular/core';
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
  public nombre: string = '';
  public apellido: string = '';
  public email: string = '';
  public password: string = '';
  public fechaNacimiento: string = '';

  constructor(private router: Router) {}

  public registrarUsuario() {
    if (this.validarCampos()) {
      this.router.navigate(['login']);
    }
  }

  private validarCampos(): boolean {
    if (!this.nombre || !this.apellido || !this.email || !this.password || !this.fechaNacimiento) {
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
