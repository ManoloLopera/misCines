import { FirestoreCineService } from './../services/firestore-cine.service';
import { FirestoreSalaService } from './../services/firestore-sala.service';
import { FirestoreSesionService } from './../services/firestore-sesion.service';
import { Factura } from './../models/factura';
import { PdfService } from './../services/pdf.service';
import { FirestoreFacturaService } from './../services/firestore-factura.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facturas-usuario',
  templateUrl: './facturas-usuario.component.html',
  styleUrls: ['./facturas-usuario.component.css']
})
export class FacturasUsuarioComponent implements OnInit {

  idUsuario;
  facturasUsuario: Factura[];
  fileIcon = faFile;
  constructor(
    private route: ActivatedRoute,
    private facturaService: FirestoreFacturaService,
    private pdfService: PdfService,
    private sesionService: FirestoreSesionService,
    private salaService: FirestoreSalaService,
    private cineService: FirestoreCineService
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');

    this.facturaService.getFacturasDeUsuario(this.idUsuario).then(
      (facturas) => {
        this.facturasUsuario = facturas.docs.map(
          (factura) => {
            const data = factura.data() as Factura;
            data.id = factura.id;
            this.sesionService.getSesion(data.idSesion).subscribe(
              (estaSesion) => {
                this.salaService.getSala(estaSesion.payload.get('sala')).subscribe(
                  (estaSala) => {
                    this.cineService.getCine(estaSala.payload.get('cine')).subscribe(
                      (esteCine) => {
                        data.nombreCine = esteCine.payload.get('nombre');
                        data.fileName = data.nombreCine + '_' + data.fechaCompra + '_' + data.id;
                      }
                    );
                  }
                );
              }
            );

            return data;
          }
        );
      }
    );
  }

  openPDF(idFactura: string, nombreCine: string) {
    this.pdfService.openPdf(idFactura, nombreCine);
  }

}
