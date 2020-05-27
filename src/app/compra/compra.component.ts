import { AuthService } from './../services/auth.service';
import { FirestoreSalaService } from './../services/firestore-sala.service';
import { FirestoreCineService } from './../services/firestore-cine.service';
import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { FirestoreSesionService } from './../services/firestore-sesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

const moment1 = moment;

export interface Asiento {
  filaAsiento: number;
  columnaAsiento: number;
}


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
  nEntradas = 0;
  subtotal = 0;
  precioEntradas: number;
  nTarjeta: string;
  fechaCaducidad: string;
  nombrePelicula: string;
  horaInicio: string;
  horaFin: string;
  nombreCine: string;
  numSala: string;
  maxAsientos: number;
  selectNAsientos: number;
  columnas: string[] = [' ', 'Cantidad', 'Precio', 'Subtotal'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioSesion: FirestoreSesionService,
    private servicioPelicula: FirestorePeliculaService,
    private servicioCine: FirestoreCineService,
    private servicioSala: FirestoreSalaService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.idSesion = this.route.snapshot.paramMap.get('id');
    this.servicioSesion.getSesion(this.idSesion).subscribe(
      (estaSesion) => {
        this.horaInicio = estaSesion.payload.get('hora_inicio');
        this.horaFin = estaSesion.payload.get('hora_fin');

        this.servicioPelicula.getPelicula(estaSesion.payload.get('pelicula')).subscribe(
          (estaPelicula) => {
            this.nombrePelicula = estaPelicula.payload.get('nombre');
          }
        );

        this.servicioSala.getSala(estaSesion.payload.get('sala')).subscribe(
          (estaSala) => {
            this.numSala = estaSala.payload.get('num_sala');
            this.maxAsientos = estaSala.payload.get('aforo');

            this.servicioCine.getCine(estaSala.payload.get('cine')).subscribe(
              (esteCine) => {
                this.nombreCine = esteCine.payload.get('nombre');
                this.precioEntradas = esteCine.payload.get('precio');
              }
            );
          }
        );
      }
    );
  }

  masEntradas() {
    this.nEntradas ++;

    this.subtotal = this.nEntradas * this.precioEntradas;
  }

  menosEntradas() {
    this.nEntradas --;

    this.subtotal = this.nEntradas * this.precioEntradas;
  }

  setNAsientos() {
    this.selectNAsientos = this.nEntradas;
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
    console.log(this.date.value);
  }

  getDatosPago(fCaducidad: string) {
    this.fechaCaducidad = fCaducidad;
    console.log(this.nTarjeta);
    console.log(this.fechaCaducidad);
  }
}
