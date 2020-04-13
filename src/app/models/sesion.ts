import { Sala } from './sala';
import { Pelicula } from './pelicula';
import { DatePipe } from '@angular/common';
import { Cine } from './cine';

export class Sesion {

  constructor(
    hora_inicio: DatePipe,
    hora_fin: DatePipe,
    idcine: Cine,
    idpelicula: Pelicula,
    idsala: Sala,
    id?: string
  ) {}
}
