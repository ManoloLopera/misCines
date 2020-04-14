import { Usuario } from './usuario';
import { Pelicula } from './pelicula';
export class Comentario {
  id?: string;
  idusuario: Usuario;
  idpelicula: Pelicula;
}
