import { Subject } from 'rxjs';
import { FirestoreIdiomaService } from './../services/firestore-idioma.service';
import { FirestoreSalaService } from './../services/firestore-sala.service';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  sesionApp: Sesion[];
  peliculasApp: Pelicula[];
  cineApp: Cine[];

  mapaCineSesiones: Map<Cine, Map<Pelicula, Sesion[]>> = new Map<Cine, Map<Pelicula, Sesion[]>>();

  refGenero: string;
  fechaFiltro: Date;

  constructor(
    private sesionService: FirestoreSesionService,
    private cineService: FirestoreCineService,
    private servicioPelicula: FirestorePeliculaService,
    private servicioIdioma: FirestoreIdiomaService
    ) {
    // Current Date
    this.minDate = new Date();
    // Máximo dos semanas (gracias stackoverflow)
    this.maxDate = new Date(this.minDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  }

  ngOnInit(): void {
    this.fechaFiltro = this.minDate;

    this.servicioPelicula.getPeliculas().subscribe(
      (peliculas) => {
        this.peliculasApp = peliculas;
      }
    );

    this.sesionService.getSesionesPorFecha(this.traductorFechaString(this.fechaFiltro)).then(
      (sesiones) => {
        this.sesionApp = sesiones.docs.map(
          sesion => {
            const data = sesion.data() as Sesion;
            data.id = sesion.id;
            return data;
          }
        );
      }
    );

    this.cineService.getCines().subscribe(
      (cines) => {
        this.cineApp = cines;
        this.cineApp.forEach(
          (cine) => {
            if (this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) !== undefined) {
              this.mapaCineSesiones.set(cine, this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) );
            }
          }
        );
      }
    );
  }


  filtroFecha(event: MatDatepickerInputEvent<Date>) {
    const fecha = new Date (event.value);
    const fechaString: string = this.traductorFechaString(fecha);
    this.sesionService.getSesionesPorFecha(fechaString).then(
      (sesiones) => {
        this.sesionApp = sesiones.docs.map(
          sesion => {
            const data = sesion.data() as Sesion;
            data.id = sesion.id;
            return data;
          }
        );
        this.mapaCineSesiones.clear();
        this.cineApp.forEach(
          (cine) => {
            if (this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) !== undefined) {
              this.mapaCineSesiones.set(cine, this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) );
            }
          }
        );
      }
    );
  }

  imagenIdioma(pelicula: Pelicula) {
    let url;
    const subject = new Subject<string>();

    this.servicioIdioma.getIdioma(pelicula.idioma).subscribe(
      (idioma) => {
        url = idioma.payload.get('imagen');
        subject.next(url);
      }
    );


    return subject.asObservable();
  }

  filtroCine(cineSeleccionado) {
    if (cineSeleccionado === 'todos') {
      this.cineApp.forEach(
        (cine) => {
          if (this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) !== undefined) {
            this.mapaCineSesiones.set(cine, this.sesionesPorCine(cine.id, this.sesionApp, this.peliculasApp) );
          }
        }
      );
    } else {
      this.mapaCineSesiones.clear();
      this.mapaCineSesiones.set(cineSeleccionado, this.sesionesPorCine(cineSeleccionado.id, this.sesionApp, this.peliculasApp));
    }
  }

  // Aquí le doy formato a la fecha que sale del DatePicker (gracias stackoverflow)
  traductorFechaString(fecha: Date): string {
    // Necesito DD (sin esto de los días 1-9 obtengo '1', y necesito '01')
    const dia = ('0' + fecha.getDate()).slice(-2);
    // Le tengo que sumar 1 porque sino me da el mes anterior (ya sabemos cómo funcionan los arrays y su índice 0)
    // Y el '0' es porque por ejemplo en febrero (contando el +1) me devuelve '2', y necesito el '02'
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();

    const fechaTraducida: string = año + '-' + mes + '-' +  dia ;

    return fechaTraducida;
  }

  sesionesPorCine(idCine: string, sesionApp: Sesion[], peliculasApp: Pelicula[]): Map<Pelicula, Sesion[]> {
    const mapa: Map<Pelicula, Sesion[]> = new Map<Pelicula, Sesion[]>();

    const sesionesDeCine: Sesion[] = sesionApp.filter(
      sesion => {
        if (sesion.cine === undefined || sesion.cine.id !== idCine ) {
          return false ;
        } else {
           return true;
        }
      }
    );

    peliculasApp.forEach(
      (pelicula) => {
        const sesionesPeliculaCine = sesionesDeCine.filter(
          sesionCine => {
            if (sesionCine === undefined || sesionCine.pelicula !== pelicula.id) {
              return false;
            } else {
              return true;
            }
          }
        );
        if (sesionesPeliculaCine.length !== 0) {
          mapa.set(pelicula, sesionesPeliculaCine);
        }

      }
    );

    if (mapa.size > 0) {
      return mapa;
    }

  }

  dameNombreCine(cine: Cine): string {
    return cine.nombre;
  }

  log(val) {
    console.log(val);
  }

}
