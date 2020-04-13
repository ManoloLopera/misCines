import { Idioma } from './idioma';
import { Genero } from './genero';
import { Time } from '@angular/common';

export class Pelicula {

  constructor(
    director: string,
    duracion: Time,
    estreno: Date,
    ffin: Date,
    genero: Genero,
    idioma: Idioma,
    imagen: File,
    nombre: string,
    sinopsis: string,
    id?: string
  ) {}
}
