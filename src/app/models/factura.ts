import { Asiento } from '../compra/compra.component';

export class Factura {
  id?: string;
  idUsuario: string;
  fechaCompra: string;
  asientos: Asiento[];
  numTarjeta: string;
  fechaCaducidadTarjeta: string;
  subtotal: number;
}
