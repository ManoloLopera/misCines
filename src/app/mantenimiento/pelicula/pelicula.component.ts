import { Idioma } from './../../models/idioma';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { Pelicula } from './../../models/pelicula';
import { MatTableDataSource } from '@angular/material/table';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Genero } from 'src/app/models/genero';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  columnas: string[] = ['Imagen', 'Nombre', 'Genero', 'Idioma', 'Director', 'Accion'];
  constructor(private servicioPelicula: FirestorePeliculaService,
              private servicioIdioma: FirestoreIdiomaService,
              private servicioGenero: FirestoreGeneroService) { }
  datos = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  ver = faEye;
  editar = faEdit;
  borrar = faTrash;
  length: number;

  ngOnInit(): void {
    this.servicioPelicula.getPeliculas().subscribe(
      peliculas => {
        peliculas.forEach(
          (pelicula) => {
            this.dameElNombreGenero(pelicula.genero).subscribe(
              nombre => {
                pelicula.genero = nombre + '';
              }
            );
            this.dameElNombreIdioma(pelicula.idioma).subscribe(
              nombre => {
                pelicula.idioma = nombre + '';
              }
            );
          }
        );
        this.length = peliculas.length;
        this.datos.data = peliculas;
        // Gracias stackoverflow
        setTimeout(() => this.datos.paginator = this.paginator);
      }
    );
  }

  dameElNombreGenero(id: string) {
    let nombre;
    const subject = new Subject();
    this.servicioGenero.getGenero(id).subscribe(
      (esteGenero) => {
        nombre = esteGenero.payload.get('nombre'),
        subject.next(nombre);
      }
    );
    return subject.asObservable();
  }

  dameElNombreIdioma(id: string) {
    let nombre;
    const subject = new Subject();
    this.servicioIdioma.getIdioma(id).subscribe(
      (esteIdioma) => {
        nombre = esteIdioma.payload.get('nombre');
        subject.next(nombre);
      }
    );
    return subject.asObservable();
  }

  eliminar(borrado: Pelicula) {
    this.servicioPelicula.deletePelicula(borrado.id);
    this.servicioPelicula.getPeliculas().subscribe(
        peliculas => {
          this.datos.data = peliculas;
        }
      );
  }

}
