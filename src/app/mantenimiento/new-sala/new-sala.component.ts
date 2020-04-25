import { FirestoreCineService } from './../../services/firestore-cine.service';
import { Cine } from './../../models/cine';
import { FirestoreSalaService } from './../../services/firestore-sala.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sala } from 'src/app/models/sala';

@Component({
  selector: 'app-new-sala',
  templateUrl: './new-sala.component.html',
  styleUrls: ['./new-sala.component.css']
})
export class NewSalaComponent implements OnInit {

  salaForm = new FormGroup({
    aforo: new FormControl('', Validators.required),
    cine: new FormControl('', Validators.required),
    num_sala: new FormControl('', Validators.required)
  });

  cineApp: Cine[];

  constructor(private router: Router, private servicio: FirestoreSalaService, private servicioCine: FirestoreCineService) { }

  ngOnInit(): void {
    this.servicioCine.getCines().subscribe(
      cines => {
        this.cineApp = cines;
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.salaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.salaForm.valid) {
      const salaNueva: Sala = {
        aforo: Number(this.salaForm.get('aforo').value),
        num_sala: Number(this.salaForm.get('num_sala').value),
        cine: String(this.salaForm.get('cine').value)
      };

      this.servicio.addSala(salaNueva).then(
        () => this.router.navigate(['salas'])
      );
    }
  }

}
