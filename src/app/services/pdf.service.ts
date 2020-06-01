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
  constructor(
    private cineService: FirestoreCineService,
    private salaService: FirestoreSalaService,
    private peliculaService: FirestorePeliculaService,
    private sesionService: FirestoreSesionService,
    private auth: AuthService
  ) { }

  generatePdf(factura: Factura, urlImagen: string, nombreCine: string) {
    this.nombreUsuario = this.auth.user.displayName;
    const documentDefinition = this.dameElTemplate(factura,urlImagen, nombreCine);
    pdfMake.createPdf(documentDefinition).open();
   }

  private dameElTemplate(factura: Factura, urlImagen: string, nombreCine: string) {
    const rows = [];
    rows.push(['Fila', 'Butaca']);
    // tslint:disable-next-line: prefer-for-of
    factura.asientos.forEach(
      asiento => {
        rows.push([asiento.filaAsiento, asiento.columnaAsiento]);
      }
    );
    console.log(rows);
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
              text: 'Cine' + nombreCine,
              style: 'name'
            },
            // {
            //   image: urlImagen ,
            //   width: 75,
            //   alignment : 'right'
            // },
            {
              text: 'Fecha Compra ' + factura.fechaCompra,
            }
            ]
          ]
        }, {
          table: {
            widths: [100, 200, 200],
            body: rows
          }
        } ],
        styles: {
          name: {
            fontSize: 16,
            bold: true
          }
        }
    };
  }

}

