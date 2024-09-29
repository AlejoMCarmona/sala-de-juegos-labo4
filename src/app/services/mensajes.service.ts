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

  public lanzarNotificacionExito(titulo: string, tiempo: number = 3000, img: string = "") {
    this.lanzarNotificacion(titulo, AlertPosition.TopEnd, AlertIcon.Success, tiempo, img);
  }

  private lanzarNotificacion(titulo: string, posicion: AlertPosition, icono: AlertIcon, tiempo: number = 3000, img: string = "") {
    const options: SweetAlertOptions = {
      toast: true,
      position: posicion,
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: tiempo,
      width: 800,
      padding: "2rem",
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

enum AlertPosition {
  Top = "top",
  TopStart = "top-start",
  TopEnd = "top-end",
  Center = "center",
  CenterStart = "center-start",
  CenterEnd = "center-end",
  Bottom = "bottom",
  BottomStart = "bottom-start",
  BottomEnd = "bottom-end"
}