import { Genero } from './../../models/genero';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild('paginator') paginator: MatPaginator;
  length: number;
  ngOnInit(): void {
    this.servicio.getGeneros().subscribe(
      generos => {
        this.length = generos.length;
        this.datos.data = generos;
        // Gracias stackoverflow
        setTimeout(() => this.datos.paginator = this.paginator);
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
