import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  constructor() { }

  public lanzarMensajeInformativo(titulo: string, mensaje: string, img = "") {
    this.lanzarMensaje(titulo, mensaje, AlertIcon.Information, img);
  }

  public lanzarMensajeExitoso(titulo: string, mensaje: string, img = "") {
    this.lanzarMensaje(titulo, mensaje, AlertIcon.Success, img);
  }

  public lanzarMensajeError(titulo: string, mensaje: string, img = "") {
    this.lanzarMensaje(titulo, mensaje, AlertIcon.Error, img);
  }

  private lanzarMensaje(titulo: string, mensaje: string, icon: AlertIcon, img: string = "") {
    const options: SweetAlertOptions = {
      icon: icon,
      title: titulo,
      text: mensaje
    };

    if(img != "") options.imageUrl = img;

    Swal.fire(options);
  }
}

enum AlertIcon {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Information = "info",
  Question = "question"
}