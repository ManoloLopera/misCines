import { Cine } from './../../models/cine';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from 'src/app/models/sala';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  datos = new MatTableDataSource();
  columnas: string[] = ['Aforo', 'Cine', 'Num_Sala', 'Accion'];
  constructor(private servicioSala: FirestoreSalaService,
              private servicioCine: FirestoreCineService) { }
  editar = faEdit;
  borrar = faTrash;

  ngOnInit(): void {
    this.servicioSala.getSalas().subscribe(
      salas => {
        this.datos.data = salas;
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

}
