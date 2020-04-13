import { Time } from '@angular/common';
export class Cine {

  constructor(
    hora_inicio: Time,
    hora_fin: Time,
    nombre: string,
    num_sala: number,
    precion: number,
    id?: string
  ) {}
}
