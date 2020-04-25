import { Cine } from './../../models/cine';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  constructor(private servicio: FirestoreCineService) { }
  columnas: string[] = ['Nombre', 'Hora Inicio', 'Hora Fin', 'Num Salas', 'Precio', 'Accion'];
  datos = new MatTableDataSource();
  editar = faEdit;
  borrar = faTrash;

  ngOnInit(): void {
    this.servicio.getCines().subscribe(
      cines => {
        this.datos.data = cines;
        console.log(cines);
      }
    );
  }

  eliminar(borrado: Cine) {
    this.servicio.deleteCine(borrado.id);
    this.servicio.getCines().subscribe(
        cines => {
          this.datos.data = cines;
        }
      );
  }

}
