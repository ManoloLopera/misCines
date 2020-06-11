import { FirestoreStorageService } from './../../services/firestore-storage.service';
import { Idioma } from './../../models/idioma';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-idioma',
  templateUrl: './edit-idioma.component.html',
  styleUrls: ['./edit-idioma.component.css']
})
export class EditIdiomaComponent implements OnInit {

  idEditado;
  idiomaForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    imagen: new FormControl(null, Validators.required)
  });
  volver = faDoorOpen;

  mensajeArchivo = 'No hay ningún archivo seleccionado';
  datosFormulario = new FormData();
  // Nombre del archivo que subiremos al Cloud Firestore
  nombreArchivo = '';
  // URL al archivo del Cloud Firestore
  URLPublica = '';
  // Porcentaje de subida del archivo al Cloud Storage
  porcentaje = 0;
  finalizado = true;

  idioma: Idioma = {nombre: '', imagen: ''};
  constructor(
    private route: ActivatedRoute, private router: Router,
    private servicio: FirestoreIdiomaService, private firestorage: FirestoreStorageService) { }

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicio.getIdioma(this.idEditado).subscribe(
      (editado) => {
        this.idioma = {
          nombre: editado.payload.get('nombre'),
          imagen: editado.payload.get('imagen')
        };
        this.URLPublica = this.idioma.imagen;

        this.cargaFormulario(this.idioma);
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

  hasError(controlName: string, errorName: string) {
    return this.idiomaForm.controls[controlName].hasError(errorName);
  }

  cargaFormulario(idioma: Idioma) {
    this.idiomaForm.get('nombre').setValue(idioma.nombre);
    this.idiomaForm.get('imagen').setValue(idioma.imagen);
  }

  onSubmit() {
    const archivo = this.datosFormulario.get('archivo');
    if (this.nombreArchivo === '') {
      const idiomaEditado: Idioma = {
        nombre: String(this.idiomaForm.get('nombre').value),
        imagen: this.URLPublica
      };

      // Agregar idioma
      this.servicio.updateIdioma(this.idEditado, idiomaEditado).then(
        () => this.router.navigate(['idioma'])
      );
    } else {
      const referencia = this.firestorage.referenceCloudStorage(this.nombreArchivo);
      const tarea = this.firestorage.cloudStorage(this.nombreArchivo, archivo);
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
          const idiomaEditado: Idioma = {
            nombre: String(this.idiomaForm.get('nombre').value),
            imagen: this.URLPublica
          };

          // Agregar idioma
          this.servicio.updateIdioma(this.idEditado, idiomaEditado).then(
            () => this.router.navigate(['idioma'])
          );
        }
      );
    }


  }

}
