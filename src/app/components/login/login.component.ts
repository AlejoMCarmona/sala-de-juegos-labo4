import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { MensajesService } from '../../services/mensajes.service';

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

  constructor(private router: Router, private auth: Auth, private firestore: Firestore, private _mensajeService: MensajesService) {}

  public autocompletar() {
    this.email = 'admin@test.com';
    this.password = 'PASS12345';
  }

  public iniciarSesion() {
    if (this.email != "" && this.password != "") {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(user => {
        const col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), "user": user.user.email });
        this.router.navigate(['home']);
      })
      .catch(() => this._mensajeService.lanzarMensajeError('ERROR', 'Debes completar todos los campos para iniciar sesión'));
    } else {
      this._mensajeService.lanzarMensajeError('ERROR', 'Debes completar todos los campos para iniciar sesión');
    }
  }
}