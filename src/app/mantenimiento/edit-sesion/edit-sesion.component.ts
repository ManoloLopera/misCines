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

@Component({
  selector: 'app-edit-sesion',
  templateUrl: './edit-sesion.component.html',
  styleUrls: ['./edit-sesion.component.css']
})
export class EditSesionComponent implements OnInit {

  idEditado;
  sesionSeleccionada: Sesion = {hora_fin: '', hora_inicio: '', sala: '', fecha_sesion: '', pelicula: ''};
  peliculasApp: Pelicula[];
  salasApp: Sala[];

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
          hora_fin: sesion.payload.get('hora_fin')
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
    console.log(id);
    this.servicioCine.getCine(id).subscribe(
      esteCine => {
        nombre = esteCine.payload.get('nombre');
        subject.next(nombre);
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

  onSubmit() {
    const sesionNueva: Sesion = {
      sala: String(this.sesionForm.get('sala').value),
      pelicula: String(this.sesionForm.get('pelicula').value),
      fecha_sesion: String(this.sesionForm.get('fecha_sesion').value),
      hora_inicio: String(this.sesionForm.get('hora_inicio').value),
      hora_fin: String(this.sesionForm.get('hora_fin').value)
    };

    this.servicioSesion.updateSesion(this.idEditado, sesionNueva).then(
      () => this.router.navigate(['sesion'])
    );
  }

}