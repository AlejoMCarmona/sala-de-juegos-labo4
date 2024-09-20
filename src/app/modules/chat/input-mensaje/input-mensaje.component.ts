import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'input-mensaje',
  templateUrl: './input-mensaje.component.html',
  styleUrl: './input-mensaje.component.css'
})

export class InputMensajeComponent {
  public mensaje: string = "";

  constructor(private chatService : ChatService){}

  public enviarMensaje(mensaje: string) {
    if (this.mensaje.trim() != "") {
      this.chatService.enviarMensaje(mensaje);
      this.mensaje = "";
    }
  }
}