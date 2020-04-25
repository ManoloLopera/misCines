import { Idioma } from './../../models/idioma';
import { Router } from '@angular/router';
import { Pelicula } from './../../models/pelicula';
import { FirestoreStorageService } from './../../services/firestore-storage.service';
import { Component, OnInit } from '@angular/core';
import { FirestorePeliculaService } from './../../services/firestore-pelicula.service';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genero } from 'src/app/models/genero';

@Component({
  selector: 'app-new-pelicula',
  templateUrl: './new-pelicula.component.html',
  styleUrls: ['./new-pelicula.component.css']
})
export class NewPeliculaComponent implements OnInit {

  mensajeArchivo = 'No hay ningún archivo seleccionado';
  datosFormulario = new FormData();
  // Nombre del archivo que subiremos al Cloud Firestore
  nombreArchivo = '';
  // URL al archivo del Cloud Firestore
  URLPublica = '';
  // Porcentaje de subida del archivo al Cloud Storage
  porcentaje = 0;
  finalizado = false;

  generoApp: Genero[];
  idiomaApp: Idioma[];

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
              private router: Router) { }

  ngOnInit(): void {
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
        const peliculaNueva: Pelicula = {
          nombre: String(this.peliculaForm.get('nombre').value),
          imagen: this.URLPublica,
          sinopsis: String(this.peliculaForm.get('sinopsis').value),
          director: String(this.peliculaForm.get('director').value),
          duracion: String(this.peliculaForm.get('duracion').value),
          estreno: this.peliculaForm.get('estreno').value,
          genero: String(this.peliculaForm.get('genero').value),
          idioma: String(this.peliculaForm.get('idioma').value)
        };

        console.log(peliculaNueva);

        // Agregar pelicula
        this.servicioPelicula.addPelicula(peliculaNueva).then(
          () => this.router.navigate(['pelicula'])
        );
      }
    );
  }

}
