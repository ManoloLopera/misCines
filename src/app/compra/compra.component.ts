import { FirestoreFacturaService } from './../services/firestore-factura.service';
import { PdfService } from './../services/pdf.service';
import { Factura } from './../models/factura';
import { Asiento } from './../models/asiento';
import { AuthService } from './../services/auth.service';
import { FirestoreSalaService } from './../services/firestore-sala.service';
import { FirestoreCineService } from './../services/firestore-cine.service';
import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { FirestoreSesionService } from './../services/firestore-sesion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faFile} from '@fortawesome/free-solid-svg-icons';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

const moment1 = moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CompraComponent implements OnInit {

  date = new FormControl(moment1());
  idSesion;
  nEntradasAdulto = 0;
  nEntradasJoven = 0;
  subtotalAdulto = 0;
  subtotalJoven = 0;
  subtotal = 0;
  precioEntradasAdulto: number;
  precioEntradasJoven: number;
  nTarjeta: string;
  fechaCaducidad: string;
  nombrePelicula: string;
  horaInicio: string;
  horaFin: string;
  nombreCine: string;
  numSala: string;
  aforo: number;
  selectNAsientos: number;
  columnas: string[] = [' ', 'Cantidad', 'Precio', 'Subtotal'];
  urlImagen: string;
  // Mapa de asientos
  numFilas: number;
  asientosXFila = 7;
  asientosSeleccionados: Asiento[] = [];
  facturasDeSesion: Factura[];
  arrays = [];
  asientosOcupados: Asiento[] = [];
  iconoFactura = faFile ;
  constructor(
    private route: ActivatedRoute,
    private servicioSesion: FirestoreSesionService,
    private servicioPelicula: FirestorePeliculaService,
    private servicioCine: FirestoreCineService,
    private servicioSala: FirestoreSalaService,
    private auth: AuthService,
    private pdfService: PdfService,
    private facturaService: FirestoreFacturaService
  ) { }

  ngOnInit(): void {
    this.idSesion = this.route.snapshot.paramMap.get('id');
    this.servicioSesion.getSesion(this.idSesion).subscribe(
      (estaSesion) => {
        this.horaInicio = estaSesion.payload.get('hora_inicio');
        this.horaFin = estaSesion.payload.get('hora_fin');

        this.facturaService.getFacturasPorSesion(this.idSesion).then(
          (facturas) => {
            this.facturasDeSesion = facturas.docs.map(
              (factura) => {
                const data = factura.data() as Factura;
                data.id = factura.id;
                return data;
              }
            );
            this.facturasDeSesion.forEach(
              factura => {
                this.arrays.push(factura.asientos);
              }
            );
            this.asientosOcupados = [].concat.apply([], this.arrays);
          }
        );

        this.servicioPelicula.getPelicula(estaSesion.payload.get('pelicula')).subscribe(
          (estaPelicula) => {
            this.nombrePelicula = estaPelicula.payload.get('nombre');
            this.urlImagen = estaPelicula.payload.get('imagen');
          }
        );

        this.servicioSala.getSala(estaSesion.payload.get('sala')).subscribe(
          (estaSala) => {
            this.numSala = estaSala.payload.get('num_sala');
            this.aforo = estaSala.payload.get('aforo');
            this.numFilas = this.aforo / this.asientosXFila;
            this.servicioCine.getCine(estaSala.payload.get('cine')).subscribe(
              (esteCine) => {
                this.nombreCine = esteCine.payload.get('nombre');
                this.precioEntradasAdulto = esteCine.payload.get('precio');
                this.precioEntradasJoven = this.damePrecioJoven(this.precioEntradasAdulto);
              }
            );
          }
        );
      }
    );
  }

  damePrecioJoven(precioAdulto: number): number {
    return Math.round((precioAdulto * 0.7) * 100 ) / 100;
  }

  masEntradasAdulto() {
    this.nEntradasAdulto ++;

    this.subtotalAdulto = Math.round((this.nEntradasAdulto * this.precioEntradasAdulto) * 100) / 100;

    this.subtotal = Math.round((this.subtotalAdulto + this.subtotalJoven) * 100) / 100;
  }

  menosEntradasAdulto() {
    this.nEntradasAdulto --;

    this.subtotalAdulto = Math.round((this.nEntradasAdulto * this.precioEntradasAdulto) * 100) / 100;

    this.subtotal = Math.round((this.subtotalAdulto + this.subtotalJoven) * 100) / 100;
  }

  masEntradasJoven() {
    this.nEntradasJoven ++;

    this.subtotalJoven = Math.round((this.nEntradasJoven * this.precioEntradasJoven) * 100) / 100;

    this.subtotal = Math.round((this.subtotalAdulto + this.subtotalJoven) * 100) / 100;
  }

  menosEntradasJoven() {
    this.nEntradasJoven --;

    this.subtotalJoven = Math.round((this.nEntradasJoven * this.precioEntradasJoven) * 100) / 100;

    this.subtotal = Math.round((this.subtotalJoven + this.subtotalAdulto) * 100) / 100;
  }

  setNAsientos() {
    this.selectNAsientos = this.nEntradasAdulto;
  }

  traductorFechaString(fecha: Date): string {
    const dia = ('0' + fecha.getDate()).slice(-2);
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();

    const fechaTraducida: string = año + '-' + mes + '-' +  dia ;

    return fechaTraducida;
  }

  // MÉTODOS PARA LA SELECCIÓN DE MES Y AÑO PARA ELEGIR LA CADUCIDAD DE LA TARJETA
  // https://material.angular.io/components/datepicker/overview#watching-the-views-for-changes-on-selected-years-and-months
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  getDatosPago(fCaducidad: string) {
    this.fechaCaducidad = fCaducidad;
  }

  tarjetaValida(numTarjeta: string) {
    const soloNumeros = /^\d+$/.test(numTarjeta);
    console.log(numTarjeta.length);
    if (numTarjeta.length === 16 && soloNumeros) {
      return false;
    } else {
      return true;
    }
  }

  asientoSeleccionado(fila: number, columna: number, event) {
    const asiento: Asiento = {
      filaAsiento: fila,
      columnaAsiento: columna
    };
    if (this.selectNAsientos > 0 && event.srcElement.classList.contains('butacaVerde')) {
      this.selectNAsientos--;
      event.srcElement.classList.remove('butacaVerde');
      event.srcElement.classList.add('butacaAmarilla');
      this.asientosSeleccionados.push(asiento);
    } else if (event.srcElement.classList.contains('butacaAmarilla')) {
      this.selectNAsientos++;
      const index = this.asientosSeleccionados.indexOf(asiento);
      this.asientosSeleccionados.splice(index, 1);
      event.srcElement.classList.remove('butacaAmarilla');
      event.srcElement.classList.add('butacaVerde');
    }
  }

  crearPDFEntrada() {
    const factura: Factura = {
      idUsuario: this.auth.user.uid,
      idSesion: this.idSesion,
      fechaCompra: this.traductorFechaString(new Date()),
      asientos: this.asientosSeleccionados,
      numTarjeta: this.nTarjeta,
      fechaCaducidadTarjeta: this.fechaCaducidad,
      subtotal: Number(this.subtotal)
    };
    this.pdfService.generatePdf(factura, this.nombreCine);
  }

  estaOcupado(fila: number, butaca: number): boolean {
    let ocupado = false;
    const asiento: Asiento = {
      filaAsiento: fila,
      columnaAsiento: butaca
    };

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.asientosOcupados.length; i++) {
      // tslint:disable-next-line: max-line-length
      if (this.asientosOcupados[i].filaAsiento === asiento.filaAsiento && this.asientosOcupados[i].columnaAsiento === asiento.columnaAsiento) {
        ocupado = true;
        break;
      }
    }


    return ocupado;
  }
}
