import { Genero } from './../../models/genero';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  columnas: string[] = ['Nombre', 'Descripcion', 'Accion'];
  appGeneros: Genero[];
  datos = new MatTableDataSource();
  constructor(private servicio: FirestoreGeneroService) { }

  editar = faEdit;
  borrar = faTrash;
  ngOnInit(): void {
    this.servicio.getGeneros().subscribe(
      generos => {
        this.datos.data = generos;
      }
    );
  }

  eliminar(borrado: Genero) {
    this.servicio.deleteGenero(borrado.id);
    this.servicio.getGeneros().subscribe(
        generos => {
          this.datos.data = generos;
        }
      );
  }

}
