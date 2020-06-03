import { FirestoreFacturaService } from './firestore-factura.service';
import { FirestoreSalaService } from './firestore-sala.service';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { FirestoreSesionService } from './firestore-sesion.service';
import { FirestoreUsuarioService } from './firestore-usuario.service';
import { FirestorePeliculaService } from './firestore-pelicula.service';
import { FirestoreCineService } from './firestore-cine.service';
import { Factura } from './../models/factura';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  imagen: string;
  nombreCine: string;
  nombreUsuario: string;
  idFactura: string;
  constructor(
    private auth: AuthService,
    private facturaService: FirestoreFacturaService
  ) { }

  generatePdf(factura: Factura, urlImagen: string, nombreCine: string) {
    this.nombreUsuario = this.auth.user.displayName;
    this.facturaService.addFactura(factura).then(
      (facturaGuardada) => {
        const documentDefinition = this.dameElTemplate(factura, facturaGuardada.id, nombreCine);
        const fileName = nombreCine + '_' + factura.fechaCompra + '_' + facturaGuardada.id;
        pdfMake.createPdf(documentDefinition).download(fileName);
      }
    );

  }

  private dameElTemplate(factura: Factura, idFactura: string, nombreCine: string) {
    const rows = [];
    rows.push(['Fila', 'Butaca']);
    // tslint:disable-next-line: prefer-for-of
    factura.asientos.forEach(
      asiento => {
        rows.push([asiento.filaAsiento, asiento.columnaAsiento]);
      }
    );
    console.log(factura.id);
    return {
      content: [
        {
          text: 'Gracias por su compra ' + this.nombreUsuario,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: 'Cine: ' + nombreCine,
              style: 'name'
            }, {
              text: 'Fecha Compra: ' + factura.fechaCompra,
            }
            ]
          ]
        }, {
          table: {
            widths: [100, 200, 200],
            body: rows
          }
        }, {
          qr: idFactura
        }],
        styles: {
          name: {
            fontSize: 16,
            bold: true
          }
        }
    };
  }

}

