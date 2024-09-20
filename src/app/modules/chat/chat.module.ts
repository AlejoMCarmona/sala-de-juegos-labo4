import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { InputMensajeComponent } from './input-mensaje/input-mensaje.component';
import { ListaMensajesComponent } from './lista-mensajes/lista-mensajes.component';
import { VentanaChatComponent } from './ventana-chat/ventana-chat.component';
import { ChatRoutingModule } from './chat.routing.module';
import { FormsModule } from '@angular/forms';
import { MensajeComponent } from './mensaje/mensaje.component';

@NgModule({
  declarations: [
    InputMensajeComponent,
    ListaMensajesComponent,
    VentanaChatComponent,
    MensajeComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  exports: [
    VentanaChatComponent
  ]
})

export class ChatModule { }
