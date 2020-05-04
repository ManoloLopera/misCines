import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { Pelicula } from './../../models/pelicula';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genero } from 'src/app/models/genero';
import { Idioma } from 'src/app/models/idioma';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-det-pelicula',
  templateUrl: './det-pelicula.component.html',
  styleUrls: ['./det-pelicula.component.css']
})
export class DetPeliculaComponent implements OnInit {

  peliculaId;
  genero: Genero = {nombre: '', descripcion: ''};
  idioma: Idioma = {nombre: '', imagen: ''};
  peliculaDet: Pelicula = {nombre: '', director: '', estreno: '',
              duracion: '', idioma: '', genero: '', sinopsis: '', imagen: ''};
  volver = faDoorOpen;
  constructor(private route: ActivatedRoute,
              private servicio: FirestorePeliculaService,
              private servicioGenero: FirestoreGeneroService,
              private servicioIdioma: FirestoreIdiomaService) { }

  ngOnInit(): void {
    this.peliculaId = this.route.snapshot.paramMap.get('id');
    this.servicio.getPelicula(this.peliculaId).subscribe(
      (pelicula) => {
        this.peliculaDet = {
          nombre: pelicula.payload.get('nombre'),
          director: pelicula.payload.get('director'),
          estreno: pelicula.payload.get('estreno'),
          duracion: pelicula.payload.get('duracion'),
          idioma: pelicula.payload.get('idioma'),
          genero: pelicula.payload.get('genero'),
          sinopsis: pelicula.payload.get('sinopsis'),
          imagen: pelicula.payload.get('imagen')
        };
      }
    );
  }

  dameElNombreGenero(id: string) {
    this.servicioGenero.getGenero(id).subscribe(
      (esteGenero) => {
        this.genero.nombre = esteGenero.payload.get('nombre'),
        this.genero.descripcion = esteGenero.payload.get('descripcion');
      }
    );
    return this.genero.nombre;
  }

  dameElNombreIdioma(id: string) {
    this.servicioIdioma.getIdioma(id).subscribe(
      (esteIdioma) => {
        this.idioma.nombre = esteIdioma.payload.get('nombre'),
        this.idioma.imagen = esteIdioma.payload.get('imagen');
      }
    );
    return this.idioma.nombre;
  }

}
