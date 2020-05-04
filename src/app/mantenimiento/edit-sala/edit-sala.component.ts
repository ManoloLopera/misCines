import { Sala } from './../../models/sala';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cine } from 'src/app/models/cine';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-sala',
  templateUrl: './edit-sala.component.html',
  styleUrls: ['./edit-sala.component.css']
})
export class EditSalaComponent implements OnInit {

  idEditado;
  selectedCine;
  salaEditada: Sala = {aforo: 0, cine: '', num_sala: 0};
  volver = faDoorOpen;
  salaForm = new FormGroup({
    aforo: new FormControl('', [
      Validators.required
    ]),
    cine: new FormControl('', Validators.required),
    num_sala: new FormControl('', Validators.required)
  });

  cineApp: Cine[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private servicioCine: FirestoreCineService,
              private servicio: FirestoreSalaService) { }

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicio.getSala(this.idEditado).subscribe(
      seleccionado => {
        this.salaEditada = {
          aforo: seleccionado.payload.get('aforo'),
          num_sala: seleccionado.payload.get('num_sala'),
          cine: seleccionado.payload.get('cine')
        };
        this.selectedCine = this.salaEditada.cine;
        this.cargaFormulario(this.salaEditada);
      }
    );

    this.servicioCine.getCines().subscribe(
      cines => {
        this.cineApp = cines;
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.salaForm.controls[controlName].hasError(errorName);
  }

  cargaFormulario(sala: Sala) {
    sala.cine = this.selectedCine;
    this.salaForm.get('aforo').setValue(sala.aforo);
    this.salaForm.get('cine').setValue(sala.cine);
    this.salaForm.get('num_sala').setValue(sala.num_sala);
  }

  onSubmit() {
    if (this.salaForm.valid) {
      const salaEditada: Sala = {
        aforo: Number(this.salaForm.get('aforo').value),
        num_sala: Number(this.salaForm.get('num_sala').value),
        cine: String(this.salaForm.get('cine').value)
      };

      this.servicio.updateSala(this.idEditado, salaEditada).then(
        () => this.router.navigate(['salas'])
      );
    }
  }

}
