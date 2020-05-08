import { MatTableDataSource } from '@angular/material/table';
import { Idioma } from './../../models/idioma';
import { FirestoreIdiomaService } from './../../services/firestore-idioma.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  constructor(private servicio: FirestoreIdiomaService) { }
  datos = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  length: number;
  columnas: string[] = ['Nombre', 'Imagen', 'Accion'];
  editar = faEdit;
  borrar = faTrash;
  idioma: Idioma = {nombre: '', imagen: '' };
  ngOnInit(): void {
    this.servicio.getIdiomas().subscribe(
      idiomas => {
        this.length = idiomas.length;
        this.datos.data = idiomas;
        // Gracias stackoverflow
        setTimeout(() => this.datos.paginator = this.paginator);
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
