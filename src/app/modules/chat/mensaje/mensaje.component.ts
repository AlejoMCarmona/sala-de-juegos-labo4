import { Component, Input } from '@angular/core';

@Component({
  selector: 'mensaje',
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})

export class MensajeComponent {
  @Input() public nombre: string = "";
  @Input() public mensaje: string = "";
  private _hora: string = "";

  @Input()
  set hora(value: string) {
    this._hora = this.formatearHora(value);
  }
  get hora(): string {
    return this._hora;
  }

  private formatearHora(hora: string): string {
    return hora.slice(0, -3);
  }
}


