import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genero } from 'src/app/models/genero';
import { Idioma } from './../../models/idioma';
import { Router } from '@angular/router';
import { Pelicula } from './../../models/pelicula';
import { FirestoreStorageService } from './../../services/firestore-storage.service';

@Component({
  selector: 'app-edit-pelicula',
  templateUrl: './edit-pelicula.component.html',
  styleUrls: ['./edit-pelicula.component.css']
})
export class EditPeliculaComponent implements OnInit {

  idEditado;
  mensajeArchivo = 'No hay ningún archivo seleccionado';
  datosFormulario = new FormData();
  // Nombre del archivo que subiremos al Cloud Firestore
  nombreArchivo = '';
  // URL al archivo del Cloud Firestore
  URLPublica = '';
  // Porcentaje de subida del archivo al Cloud Storage
  porcentaje = 0;
  finalizado = true;


  generoApp: Genero[];
  idiomaApp: Idioma[];
  peliculaCargada: Pelicula = {
    nombre: '',
    imagen: '',
    sinopsis: '',
    director: '',
    duracion: '',
    estreno: new Date(),
    genero: '',
    idioma: ''
  };

  peliculaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    estreno: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    idioma: new FormControl('', Validators.required),
    sinopsis: new FormControl('', Validators.required)
  });

  constructor(private servicioPelicula: FirestorePeliculaService,
              private servicioIdioma: FirestoreIdiomaService,
              private servicioGenero: FirestoreGeneroService,
              private firestorage: FirestoreStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicioPelicula.getPelicula(this.idEditado).subscribe(
      (editado) => {
        this.peliculaCargada = {
          nombre : editado.payload.get('nombre'),
          imagen : editado.payload.get('imagen'),
          director : editado.payload.get('director'),
          duracion : editado.payload.get('duracion'),
          estreno : editado.payload.get('estreno'),
          idioma : editado.payload.get('idioma'),
          genero : editado.payload.get('genero'),
          sinopsis : editado.payload.get('sinopsis')
        };
        this.URLPublica = this.peliculaCargada.imagen;
        this.cargaFormulario(this.peliculaCargada);
      }
    );

    this.servicioGenero.getGeneros().subscribe(
      generos => {
        this.generoApp = generos;
      }
    );

    this.servicioIdioma.getIdiomas().subscribe(
      idiomas => {
        this.idiomaApp = idiomas;
      }
    );
  }

  cargaFormulario(pelicula: Pelicula) {
    this.peliculaForm.get('idioma').setValue(pelicula.idioma);
    this.peliculaForm.get('genero').setValue(pelicula.genero);
    this.peliculaForm.get('nombre').setValue(pelicula.nombre);
    this.peliculaForm.get('sinopsis').setValue(pelicula.sinopsis);
    this.peliculaForm.get('director').setValue(pelicula.director);
    this.peliculaForm.get('duracion').setValue(pelicula.duracion);
    this.peliculaForm.get('estreno').setValue(pelicula.estreno);
    this.peliculaForm.get('genero').setValue(pelicula.genero);
    this.peliculaForm.get('idioma').setValue(pelicula.idioma);
    this.peliculaForm.get('imagen').setValue(pelicula.imagen);
  }

  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.peliculaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.firestorage.referenceCloudStorage(this.nombreArchivo);
    let tarea = this.firestorage.cloudStorage(this.nombreArchivo, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje === 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe(
      (URL) => {
        this.URLPublica = URL;
        // Creo la película
        const peliculaEditada: Pelicula = {
          nombre: String(this.peliculaForm.get('nombre').value),
          imagen: this.URLPublica,
          sinopsis: String(this.peliculaForm.get('sinopsis').value),
          director: String(this.peliculaForm.get('director').value),
          duracion: String(this.peliculaForm.get('duracion').value),
          estreno: this.peliculaForm.get('estreno').value,
          genero: this.peliculaForm.get('genero').value,
          idioma: this.peliculaForm.get('idioma').value
        };

        console.log(peliculaEditada);

        // Agregar pelicula
        this.servicioPelicula.updatePelicula(this.idEditado, peliculaEditada).then(
          () => this.router.navigate(['pelicula'])
        );
      }
    );
  }

}
