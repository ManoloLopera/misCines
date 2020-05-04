import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Cine } from './../../models/cine';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-cine',
  templateUrl: './new-cine.component.html',
  styleUrls: ['./new-cine.component.css']
})
export class NewCineComponent implements OnInit {

  volver = faDoorOpen;
  cineForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    num_sala: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^\[0-9]{1,3}?$/)
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?(?:[1-9]\d*(?:\.\d{1,2})?|0\.(?:[1-9]\d?|\d[1-9]))$/)
    ]),
    hora_inicio: new FormControl('', Validators.required),
    hora_fin: new FormControl('', Validators.required)
  });
  constructor(private router: Router, private servicio: FirestoreCineService) { }

  ngOnInit(): void {
  }

  hasError(controlName: string, errorName: string) {
    return this.cineForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.cineForm.valid) {
      const cineNuevo: Cine = {
        nombre: String(this.cineForm.get('nombre').value),
        num_sala: Number(this.cineForm.get('num_sala').value),
        precio: Number(this.cineForm.get('precio').value),
        hora_inicio: this.cineForm.get('hora_inicio').value,
        hora_fin: this.cineForm.get('hora_fin').value
      };

      console.log(cineNuevo);

      this.servicio.addCine(cineNuevo).then(
        () => this.router.navigate(['cine'])
      );
    }
  }

}
