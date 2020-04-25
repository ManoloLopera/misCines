import { MatTableDataSource } from '@angular/material/table';
import { Idioma } from './../../models/idioma';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  constructor(private servicio: FirestoreIdiomaService) { }
  datos = new MatTableDataSource();
  columnas: string[] = ['Nombre', 'Imagen', 'Accion'];
  editar = faEdit;
  borrar = faTrash;
  idioma: Idioma = {nombre: '', imagen: '' };
  ngOnInit(): void {
    this.servicio.getIdiomas().subscribe(
      idiomas => {
        this.datos.data = idiomas;
      }
    );
  }

  eliminar(borrado: Idioma) {
    this.servicio.deleteIdioma(borrado.id);
    this.servicio.getIdiomas().subscribe(
        idiomas => {
          this.datos.data = idiomas;
        }
      );
  }

}
