import { Idioma } from './idioma';
import { Genero } from './genero';
import { Time } from '@angular/common';

export class Pelicula {
  id?: string;
  director: string;
    duracion: Time;
    estreno: Date;
    ffin: Date;
    genero: Genero;
    idioma: Idioma;
    imagen: File;
    nombre: string;
    sinopsis: string;
}
