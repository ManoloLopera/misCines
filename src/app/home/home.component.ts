import { Cine } from './../models/cine';
import { FirestoreCineService } from './../services/firestore-cine.service';
import { Pelicula } from './../models/pelicula';
import { Genero } from './../models/genero';
import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { FirestoreGeneroService } from './../services/firestore-genero.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FirestoreSesionService } from '../services/firestore-sesion.service';
import { Sesion } from '../models/sesion';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formattedDate: string;
  minDate: Date;
  maxDate: Date;

  generoApp: Genero[];
  sesionApp: Sesion[];
  cineApp: Cine[];

  refGenero: string;
  refCine: string;
  peliculasFiltradas: Pelicula[];

  constructor(
    private generoService: FirestoreGeneroService,
    private sesionService: FirestoreSesionService,
    private cineService: FirestoreCineService,
    private servicioPelicula: FirestorePeliculaService
    ) {
    // Current Date
    this.minDate = new Date();
    // Máximo dos semanas (gracias stackoverflow)
    this.maxDate = new Date(this.minDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  }

  ngOnInit(): void {
    this.generoService.getGeneros().subscribe(
      (generos) => {
        this.generoApp = generos;
      }
    );

    this.cineService.getCines().subscribe(
      (cines) => {
        this.cineApp = cines;
      }
    );

    this.filtraPorFecha(this.minDate);

  }

  // Aquí le doy formato a la fecha que sale del DatePicker (gracias stackoverflow)

  first(event: MatDatepickerInputEvent<Date>) {
    const fecha = new Date (event.value);
    this.filtraPorFecha(fecha);

  }

  filtraPorFecha(fecha: Date) {
    // Necesito DD (sin esto de los días 1-9 obtengo '1', y necesito '01')
    const dia = ('0' + fecha.getDate()).slice(-2);
    // Le tengo que sumar 1 porque sino me da el mes anterior (ya sabemos cómo funcionan los arrays y su índice 0)
    // Y el '0' es porque por ejemplo en febrero (contando el +1) me devuelve '2', y necesito el '02'
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();

    this.formattedDate = año + '-' + mes + '-' +  dia ;

    this.sesionService.getSesionesPorFecha(this.formattedDate).then(
      (sesiones) => {
        this.sesionApp = sesiones.docs.map(
          sesion => {
            const data = sesion.data() as Sesion;
            this.dameElNombrePelicula(data.pelicula).subscribe(
              (nombrePelicula) => {
                data.pelicula = nombrePelicula;
              }
            );
            this.dameLaPortada(data.pelicula).subscribe(
              (portada) => {
                data.portadaPelicula = portada;
              }
            );
            data.id = sesion.id;
            return data;
          }
        );
      }
    );
  }

  dameElNombrePelicula(id: string) {
    let nombre;
    const subject = new Subject<string>();
    this.servicioPelicula.getPelicula(id).subscribe(
      (estaPelicula) => {
        nombre = estaPelicula.payload.get('nombre');
        subject.next(nombre);

      }
    );
    return subject.asObservable();
  }

  dameLaPortada(id: string) {
    let portada;
    const subject = new Subject<string>();
    this.servicioPelicula.getPelicula(id).subscribe(
      (estaPelicula) => {
        portada = estaPelicula.payload.get('imagen');
        subject.next(portada);
      }
    );
    return subject.asObservable();
  }

}
