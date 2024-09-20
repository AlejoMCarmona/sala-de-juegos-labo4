import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrl: './lista-mensajes.component.css'
})

export class ListaMensajesComponent implements OnInit, AfterViewChecked {
  public mensajes: any[] = [];
  public usuario: string = "";
   @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private chatService: ChatService, private auth: AuthService){}

  ngOnInit(): void {
    this.chatService.obtenerMensajes().subscribe(mensajes => {
      this.mensajes = mensajes;
    });
    this.auth.obtenerEmail().subscribe(email => {
      this.usuario = email ?? "";
    });
  }

  // Cada vez que se cambia la vista (es decir, se agreguen nuevos mensajes) se scrollea la ventana hacia abajo
  // para poder tener siempre los últimos mensajes a la vista.
  ngAfterViewChecked(): void {
    this.scrollearHaciaAbajo();
  }

  public esUnMensajeDelUsuario(emailMensaje: string) {
    return this.usuario == emailMensaje;
  }

  private scrollearHaciaAbajo(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }
}
