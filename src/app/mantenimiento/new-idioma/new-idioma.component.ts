import { Router } from '@angular/router';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { Idioma } from './../../models/idioma';
import { FirestoreStorageService } from './../../services/firestore-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-idioma',
  templateUrl: './new-idioma.component.html',
  styleUrls: ['./new-idioma.component.css']
})
export class NewIdiomaComponent implements OnInit {
  volver = faDoorOpen;
  idiomaForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    imagen: new FormControl(null, Validators.required)
  });

  mensajeArchivo = 'No hay ningún archivo seleccionado';
  datosFormulario = new FormData();
  // Nombre del archivo que subiremos al Cloud Firestore
  nombreArchivo = '';
  // URL al archivo del Cloud Firestore
  URLPublica = '';
  // Porcentaje de subida del archivo al Cloud Storage
  porcentaje = 0;
  finalizado = false;

  constructor(
    private firestorage: FirestoreStorageService,
    private servicio: FirestoreIdiomaService,
    private router: Router) { }

  ngOnInit(): void {
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
      this.mensajeArchivo = 'No hay ningún archivo seleccionado';
    }
  }

  // Sube el archivo a Cloud Storage
  public subirArchivo() {
    if (this.idiomaForm.valid) {
      // Recogemos la imagen
      let archivo = this.datosFormulario.get('archivo');
      // La referencia en Local Storage con el nombre del archivo
      let referencia = this.firestorage.referenceCloudStorage(this.nombreArchivo);
      // Preparacion para subir el archivo
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
          // Creo el idioma
          const idiomaNuevo: Idioma = {
            nombre: String(this.idiomaForm.get('nombre').value),
            imagen: this.URLPublica
          };

          // Agregar idioma
          this.servicio.addIdioma(idiomaNuevo).then(
            () => this.router.navigate(['idioma'])
          );
        }
      );
    }

  }

}
