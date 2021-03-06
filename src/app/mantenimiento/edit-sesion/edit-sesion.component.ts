import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { FirestoreSesionService } from './../../services/firestore-sesion.service';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/models/sesion';
import { Pelicula } from 'src/app/models/pelicula';
import { Sala } from 'src/app/models/sala';
import { Subject } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Cine } from 'src/app/models/cine';
@Component({
  selector: 'app-edit-sesion',
  templateUrl: './edit-sesion.component.html',
  styleUrls: ['./edit-sesion.component.css']
})
export class EditSesionComponent implements OnInit {

  idEditado;
  sesionSeleccionada: Sesion = {hora_fin: '', hora_inicio: '', sala: '', fecha_sesion: '', pelicula: '', cine: new Cine()};
  peliculasApp: Pelicula[];
  salasApp: Sala[];
  formattedDate: string;
  volver = faDoorOpen;
  cineCompleto: Cine = new Cine();
  constructor(
    private route: ActivatedRoute,
    private servicioSesion: FirestoreSesionService,
    private servicioPelicula: FirestorePeliculaService,
    private servicioSala: FirestoreSalaService,
    private servicioCine: FirestoreCineService,
    private router: Router) { }

  sesionForm = new FormGroup({
    sala: new FormControl('', Validators.required),
    pelicula: new FormControl('', Validators.required),
    hora_inicio: new FormControl('', Validators.required),
    hora_fin: new FormControl('', Validators.required),
    fecha_sesion: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicioSesion.getSesion(this.idEditado).subscribe(
      sesion => {
        this.sesionSeleccionada = {
          pelicula: sesion.payload.get('pelicula'),
          sala: sesion.payload.get('sala'),
          fecha_sesion: sesion.payload.get('fecha_sesion'),
          hora_inicio: sesion.payload.get('hora_inicio'),
          hora_fin: sesion.payload.get('hora_fin'),
          cine: sesion.payload.get('cine')
        };

        this.cargaFormulario(this.sesionSeleccionada);
      }
    );

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
    this.servicioCine.getCine(id).subscribe(
      esteCine => {
        nombre = esteCine.payload.get('nombre');
        subject.next(nombre);
      }
    );
    return subject.asObservable();
  }

  dameElCine(idSala: string) {
    let idCine;
    let cine: Cine;
    const subject = new Subject<Cine>();
    this.servicioSala.getSala(idSala).subscribe(
      (estaSala) => {
        idCine = estaSala.payload.get('cine');
        this.servicioCine.getCine(idCine).subscribe(
          (esteCine) => {
            cine = {
              id: idCine ,
              nombre: esteCine.payload.get('nombre'),
              num_sala: esteCine.payload.get('num_sala'),
              precio: esteCine.payload.get('precio'),
              hora_inicio: esteCine.payload.get('hora_inicio'),
              hora_fin: esteCine.payload.get('hora_fin')
            };
            subject.next(cine);
          }
        );
      }
    );
    return subject.asObservable();
  }

  cargaFormulario(sesion: Sesion) {
    this.sesionForm.get('pelicula').setValue(sesion.pelicula);
    this.sesionForm.get('sala').setValue(sesion.sala);
    this.sesionForm.get('fecha_sesion').setValue(sesion.fecha_sesion);
    this.sesionForm.get('hora_inicio').setValue(sesion.hora_inicio);
    this.sesionForm.get('hora_fin').setValue(sesion.hora_fin);
  }

  // Aqu?? le doy formato a la fecha que sale del DatePicker
  first(event: MatDatepickerInputEvent<Date>) {
    // const fecha = event.value.format('DD-MM-YYYY');
    const fecha = new Date (event.value);
    // Necesito DD (sin esto de los d??as 1-9 obtengo '1', y necesito '01')
    const dia = ('0' + fecha.getDate()).slice(-2);
    // Le tengo que sumar 1 porque sino me da el mes anterior (ya sabemos c??mo funcionan los arrays y su ??ndice 0)
    // Y el '0' es porque por ejemplo en febrero (contando el +1) me devuelve '2', y necesito el '02'
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const a??o = fecha.getFullYear();
    // En formularios lo meto como a??o-mes-dia para no tener que desmontar todo el tema de las fechas
    this.formattedDate = a??o + '-' + mes + '-' +  dia ;
  }

  onSubmit() {
    this.dameElCine(String(this.sesionForm.get('sala').value)).subscribe(
      cine => {
        //  Hago esto porque si al editar la sesi??n no cambia la fecha, formattedDate es undefined, y as?? me aseguro que
        //  no me de error
        if (this.formattedDate === undefined) {
          this.formattedDate = String(this.sesionForm.get('fecha_sesion').value);
        }
        this.cineCompleto = cine;
        const sesionNueva: Sesion = {
          sala: String(this.sesionForm.get('sala').value),
          pelicula: String(this.sesionForm.get('pelicula').value),
          fecha_sesion: this.formattedDate,
          hora_inicio: String(this.sesionForm.get('hora_inicio').value),
          hora_fin: String(this.sesionForm.get('hora_fin').value),
          cine: this.cineCompleto
        };

        this.servicioSesion.updateSesion(this.idEditado, sesionNueva).then(
          () => this.router.navigate(['sesion'])
        );
      }
    );
  }
}
