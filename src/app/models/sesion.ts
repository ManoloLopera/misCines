import { Cine } from './cine';
import { Pelicula } from './pelicula';
export class Sesion {
    hora_inicio: string;
    hora_fin: string;
    fecha_sesion: string;
    pelicula: string;
    sala: string;
    cine?: Cine;
    id?: string;
}
