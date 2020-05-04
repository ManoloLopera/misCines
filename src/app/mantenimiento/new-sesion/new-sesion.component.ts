import { Router } from '@angular/router';
import { Sesion } from './../../models/sesion';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { Sala } from './../../models/sala';
import { Pelicula } from './../../models/pelicula';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { FirestoreSesionService } from './../../services/firestore-sesion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-sesion',
  templateUrl: './new-sesion.component.html',
  styleUrls: ['./new-sesion.component.css']
})
export class NewSesionComponent implements OnInit {

  volver = faDoorOpen;
  peliculasApp: Pelicula[];
  salasApp: Sala[];

  cine;
  numSala;
  nombreCine;

  formattedDate: string;
  constructor(
    private servicioSesion: FirestoreSesionService,
    private servicioPelicula: FirestorePeliculaService,
    private servicioSala: FirestoreSalaService,
    private servicioCine: FirestoreCineService,
    private router: Router
    ) { }

    sesionForm = new FormGroup({
      sala: new FormControl('', Validators.required),
      pelicula: new FormControl('', Validators.required),
      hora_inicio: new FormControl('', Validators.required),
      hora_fin: new FormControl('', Validators.required),
      fecha_sesion: new FormControl('', Validators.required)
    });

  ngOnInit(): void {

    this.servicioPelicula.getPeliculas().subscribe(
      peliculas => {
        this.peliculasApp = peliculas;
      }
    );

    this.servicioSala.getSalas().subscribe(
      salas => {
        salas.forEach(
          sala => {
            this.dameElNombreCine(sala.cine).subscribe(
              cine => {
                sala.cine = cine;
              }
            );
          }
        );

        this.salasApp = salas;
      }
    );
  }

  dameElNombreCine(id: string) {
    let nombre;
    const subject = new Subject<string>();
    console.log(id);
    this.servicioCine.getCine(id).subscribe(
      esteCine => {
        nombre = esteCine.payload.get('nombre');
        subject.next(nombre);
      }
    );
    return subject.asObservable();
  }

  // Aquí le doy formato a la fecha que sale del DatePicker
  first(event: MatDatepickerInputEvent<Date>) {
    // const fecha = event.value.format('DD-MM-YYYY');
    const fecha = new Date (event.value);
    const dia = ('0' + fecha.getDate()).slice(-2);
    // Le tengo que sumar 1 porque sino me da el mes anterior (ya sabemos cómo funcionan los arrays y su índice 0)
    // Y el '0' es porque por ejemplo en febrero (contando el +1) me devuelve '2', y necesito el '02'
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();
    // En formularios lo meto como año-mes-dia para no tener que desmontar todo el tema de las fechas
    this.formattedDate = año + '-' + mes + '-' +  dia ;
  }

  onSubmit() {
    const sesionNueva: Sesion = {
      sala: String(this.sesionForm.get('sala').value),
      pelicula: String(this.sesionForm.get('pelicula').value),
      fecha_sesion: this.formattedDate,
      hora_inicio: String(this.sesionForm.get('hora_inicio').value),
      hora_fin: String(this.sesionForm.get('hora_fin').value)
    };

    this.servicioSesion.addSesion(sesionNueva).then(
      () => this.router.navigate(['sesion'])
    );
  }

}
