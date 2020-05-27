import { DatePipe } from '@angular/common';
import { FirestoreUsuarioService } from './../services/firestore-usuario.service';

import { FirestoreIdiomaService } from './../services/firestore-idioma.service';
import { FirestoreGeneroService } from './../services/firestore-genero.service';
import { Comentario } from './../models/comentario';
import { FirestoreComentarioService } from './../services/firestore-comentario.service';
import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../models/pelicula';
import { faDoorOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Genero } from '../models/genero';
import { Idioma } from '../models/idioma';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComentComponent } from '../componentes/dialog-coment/dialog-coment.component';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ComentData {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-sinopsispelicula',
  templateUrl: './sinopsispelicula.component.html',
  styleUrls: ['./sinopsispelicula.component.css']
})

export class SinopsisPeliculaComponent implements OnInit {

  peliculaId;
  peliculaDet: Pelicula = {nombre: '', director: '', estreno: '',
              duracion: '', idioma: '', genero: '', sinopsis: '', imagen: ''};
  comentariosPelicula: Comentario[];
  volver = faDoorOpen;
  add = faPlus;

  genero: Genero = {nombre: '', descripcion: ''};
  idioma: Idioma = {nombre: '', imagen: ''};

  constructor(
    private route: ActivatedRoute,
    private servicioPelicula: FirestorePeliculaService,
    private servicioGenero: FirestoreGeneroService,
    private servicioIdioma: FirestoreIdiomaService,
    private servicioComentarios: FirestoreComentarioService,
    private servicioUsuario: FirestoreUsuarioService,
    public dialog: MatDialog,
    public auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.peliculaId = this.route.snapshot.paramMap.get('id');

    this.servicioPelicula.getPelicula(this.peliculaId).subscribe(
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

    this.servicioComentarios.comentariosPorPelicula(this.peliculaId).then(
      (comentarios) => {
        this.comentariosPelicula = comentarios.docs.map(
          (comentario) => {
            const data = comentario.data() as Comentario;
            this.servicioUsuario.getUsuario(data.idUsuario).subscribe(
              usuario => {
                data.idUsuario = usuario.payload.get('name');
              }
            );
            data.id = comentario.id;
            return data;
          }
        );
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

  openDialog(): void {
    if (!this.auth.isAuthenticated()) {
      this._snackBar.open('Necesitas estar loggeado para comentar!', '', {
        duration: 2000
      });
    } else {
      const dialogRef = this.dialog.open(
        DialogComentComponent, {
          width: '250px',
          data: {titulo: '', descripcion: ''}
        }
      );

      dialogRef.afterClosed().subscribe(
        result => {
          const comentario: Comentario = {
            idPelicula: this.peliculaId,
            idUsuario: this.auth.user.uid,
            tituloComentario: result.titulo,
            descripcionComentario: result.descripcion,
            fechaComentario: this.traductorFechaString(new Date())
          };

          console.log(comentario);
          this.servicioComentarios.addComentario(comentario).then(
            () => {
              this._snackBar.open('Gracias por el comentario !', '', {
                duration: 2000
              });

              this.router.navigate(['sinopsis']);
            }
          );
        }
      );
    }
  }

  traductorFechaString(fecha: Date): string {
    const dia = ('0' + fecha.getDate()).slice(-2);
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();

    const fechaTraducida: string = año + '-' + mes + '-' +  dia ;

    return fechaTraducida;
  }
}

