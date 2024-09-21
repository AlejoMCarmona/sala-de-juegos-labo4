import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrl: './lista-mensajes.component.css'
})

export class ListaMensajesComponent implements OnInit, OnDestroy, AfterViewChecked {
  private suscripciones: Subscription = new Subscription();
  public mensajes: any[] = [];
  public usuario: string = "";
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private chatService: ChatService, private auth: AuthService){}

  ngOnInit(): void {
    this.suscripciones.add(this.chatService.obtenerMensajesObservable().subscribe(mensajes => {
      this.mensajes = mensajes;
    }));
    this.auth.obtenerEmailUsuario().then(email => {
      this.usuario = email;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollearHaciaAbajo();
  }

  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
  }

  public esUnMensajeDelUsuario(emailMensaje: string) {
    return this.usuario == emailMensaje;
  }

  private scrollearHaciaAbajo(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }
}
