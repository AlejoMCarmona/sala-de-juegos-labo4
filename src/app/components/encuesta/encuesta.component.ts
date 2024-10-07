import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from './services/encuesta.service';
import { MensajesService } from '../../services/mensajes.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})

export class EncuestaComponent implements OnInit {
  public formularioEncuesta!: FormGroup;
  public listaPaises: string[] = [];
  public fechaActual!: string;
  public datosPersonalesCompletados: boolean = false;

  constructor(private _formsBuilder: FormBuilder, private _encuestaService: EncuestaService, private _mensajeService: MensajesService, private _router: Router) {}

  ngOnInit(): void {
    this.formularioEncuesta = this._formsBuilder.group({
      nombre: ['', { validators: [ Validators.required, Validators.pattern('^[A-Za-z]+$') ] }],
      apellido: ['', { validators: [ Validators.required, Validators.pattern('^[A-Za-z]+$') ] }],
      fechaNacimiento: ['', Validators.required ],
      edad: [ '', { validators: [ Validators.required, Validators.min(18), Validators.max(99) ] }],
      telefono: [ '', { validators: [ Validators.required, Validators.pattern('^[0-9]{10}$') ] }],
      pais: [ '', Validators.required ],
      juegoFavorito: [ '', Validators.required ],
      juegoMenosGusta: [ '', Validators.required ],
      puntajePagina: [ '', Validators.required ],
      recomendaciones: [ '', Validators.required ],
      aceptoUso: [false, Validators.requiredTrue ],
    });

    this.fechaActual = new Date().toISOString().split('T')[0];
    this.listaPaises = [ "Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria",
      "Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil",
      "Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia",
      "Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos",
      "Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia",
      "Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón",
      "Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania",
      "Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro",
      "Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea",
      "Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo",
      "República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía",
      "Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam",
      "Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu",
      "Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue" ];
  }

  public get nombre() {
    return this.formularioEncuesta.get('nombre');
  }

  public get apellido() {
    return this.formularioEncuesta.get('apellido');
  }

  public get fechaNacimiento() {
    return this.formularioEncuesta.get('fechaNacimiento');
  }

  public get edad() {
    return this.formularioEncuesta.get('edad');
  }

  public get telefono() {
    return this.formularioEncuesta.get('telefono');
  }

  public get pais() {
    return this.formularioEncuesta.get('pais');
  }

  public get juegoFavorito() {
    return this.formularioEncuesta.get('juegoFavorito');
  }

  public get puntajePagina() {
    return this.formularioEncuesta.get('puntajePagina');
  }
  
  public get recomendaciones() {
    return this.formularioEncuesta.get('recomendaciones');
  }
  
  public get aceptoUso() {
    return this.formularioEncuesta.get('aceptoUso');
  }
    
  public get juegoMenosGusta() {
    return this.formularioEncuesta.get('juegoMenosGusta');
  }

  public calcularEdad() {
    const fechaNacimiento = this.formularioEncuesta.get('fechaNacimiento')?.value;
    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
      if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      this.formularioEncuesta.patchValue({ edad });
    }
  }

  public enviarEncuesta() {
    this.formularioEncuesta.markAllAsTouched();

    if (this.formularioEncuesta.valid) {
      const data = { 
        nombre: this.nombre?.value,
        apellido: this.apellido?.value,
        fechaNacimiento: this.fechaNacimiento?.value ,
        edad: this.edad?.value,
        telefono: this.telefono?.value,
        pais: this.pais?.value,
        juegoFavorito: this.juegoFavorito?.value,
        juegoMenosGusta: this.juegoMenosGusta?.value,
        puntajePagina: this.puntajePagina?.value,
        recomendaciones: this.recomendaciones?.value,
        aceptoUso: this.aceptoUso?.value
      };

      this._encuestaService.enviarEncuesta(data)
      .then(() => {
        this._mensajeService.lanzarMensajeExitoso("¡Muchas gracias!", "Su opinión será tenida en cuenta por los administradores de la página, gracias por disfrutar del sitio.");
      })
      .catch(() => {
        this._mensajeService.lanzarMensajeError("ERROR", "Hubo un error a la hora de subir su encuesta. Intentelo de nuevo más tarde, por favor.");
      })
      .finally(() => {
        this._router.navigate(["home"]);
      });
    }
  }

  public autoCompletarEncuesta() {
    this.formularioEncuesta.patchValue({
      nombre: 'Juan',
      apellido: 'Perez',
      fechaNacimiento: '1990-01-01',
      telefono: '1234567890',
      pais: 'Argentina',
      juegoFavorito: 'Ahorcado',
      juegoMenosGusta: 'Mayor o menor',
      puntajePagina: 8,
      recomendaciones: 'Me encanta la experiencia del sitio, sigan así.',
      aceptoUso: true,
    });

    this.calcularEdad();
  }
}
