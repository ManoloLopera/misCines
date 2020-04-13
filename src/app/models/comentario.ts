import { Usuario } from './usuario';
import { Pelicula } from './pelicula';
export class Comentario {

  constructor(
    idpelicula: Pelicula,
    idusuario: Usuario,
    id?: string
  ) {}
}
