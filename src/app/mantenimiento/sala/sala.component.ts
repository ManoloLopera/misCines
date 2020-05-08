import { Cine } from './../../models/cine';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from 'src/app/models/sala';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  datos = new MatTableDataSource();
  columnas: string[] = ['Aforo', 'Cine', 'Num_Sala', 'Accion'];
  @ViewChild('paginator') paginator: MatPaginator;
  length: number;
  constructor(private servicioSala: FirestoreSalaService,
              private servicioCine: FirestoreCineService) { }
  editar = faEdit;
  borrar = faTrash;

  ngOnInit(): void {
    this.servicioSala.getSalas().subscribe(
      salas => {
        salas.forEach(
          (sala) => {
            this.dameElNombreCine(sala.cine).subscribe(
              (nombre) => {
                sala.cine = nombre + '';
              }
            );
          }
        );
        this.length = salas.length;
        this.datos.data = salas;
        // Gracias stackoverflow
        setTimeout(() => this.datos.paginator = this.paginator);
      }
    );
  }

  eliminar(borrado: Sala) {
    this.servicioSala.deleteSala(borrado.id);
    this.servicioSala.getSalas().subscribe(
        salas => {
          this.datos.data = salas;
        }
      );
  }

  dameElNombreCine(id: string) {
    let nombre;
    const subject = new Subject();
    this.servicioCine.getCine(id).subscribe(
      (esteCine) => {
        nombre = esteCine.payload.get('nombre'),
        subject.next(nombre);
      }
    );
    return subject.asObservable();
  }

}
