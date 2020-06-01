import { Asiento } from './asiento';


export class Factura {
  id?: string;
  idSesion: string;
  idUsuario: string;
  fechaCompra: string;
  asientos: Asiento[];
  numTarjeta: string;
  fechaCaducidadTarjeta: string;
  subtotal: number;
}
