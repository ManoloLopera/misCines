import { Sesion } from './../../models/sesion';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { FirestoreSesionService } from './../../services/firestore-sesion.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  datos = new MatTableDataSource();
  columnas: string[] = ['Sala', 'Pelicula', 'Hora_Inicio', 'Hora_Fin', 'Accion'];

  constructor(private servicioSesion: FirestoreSesionService,
              private servicioCine: FirestoreCineService,
              private servicioPelicula: FirestorePeliculaService,
              private servicioSala: FirestoreSalaService) { }
  editar = faEdit;
  borrar = faTrash;

  ngOnInit(): void {
    this.servicioSesion.getSesiones().subscribe(
      sesiones => {
        sesiones.forEach(
          (sesion) => {
            this.dameElNombrePelicula(sesion.pelicula).subscribe(
              nombre => {
                sesion.pelicula = nombre;
              }
            );
            this.dameLaSala(sesion.sala).subscribe(
              sala => {
                sesion.sala = sala + '';
              }
            );
          }
        );
        this.datos.data = sesiones;
      }
    );
  }

  dameElNombrePelicula(id: string) {
    let nombre;
    const subject = new Subject<string>();
    this.servicioPelicula.getPelicula(id).subscribe(
      estaPelicula => {
        nombre = estaPelicula.payload.get('nombre');
        subject.next(nombre);
      }
    );
    return subject.asObservable();
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

  dameLaSala(id: string) {
    let cine;
    let sala;
    let cineYSala;
    const subject = new Subject();
    this.servicioSala.getSala(id).subscribe(
      estaSala => {
        sala = estaSala.payload.get('num_sala');
        cine = estaSala.payload.get('cine');
        this.dameElNombreCine(cine).subscribe(
          nombre => {
            cineYSala = nombre + ' => ' + sala;
            subject.next(cineYSala);
          }
        );
      }
    );
    return subject.asObservable();
  }

  eliminar(borrado: Sesion) {
    this.servicioSesion.deleteSesion(borrado.id);
    this.servicioSesion.getSesiones().subscribe(
        sesiones => {
          this.datos.data = sesiones;
        }
      );
  }

}
