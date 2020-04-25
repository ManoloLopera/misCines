import { Cine } from './../../models/cine';
import { FirestoreCineService } from './../../services/firestore-cine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-cine',
  templateUrl: './edit-cine.component.html',
  styleUrls: ['./edit-cine.component.css']
})
export class EditCineComponent implements OnInit {

  idEditado;
  cine: Cine = {nombre: '', num_sala: 0, precio: 0, hora_inicio: '', hora_fin: ''};
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
  constructor(private route: ActivatedRoute, private router: Router, private servicio: FirestoreCineService) { }

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicio.getCine(this.idEditado).subscribe(
      (editado) => {
        this.cine = {
          nombre: editado.payload.get('nombre'),
          num_sala: editado.payload.get('num_sala'),
          precio: editado.payload.get('precio'),
          hora_inicio: editado.payload.get('hora_inicio'),
          hora_fin: editado.payload.get('hora_fin')
        };
        this.cargaFormulario(this.cine);
      }
    );

  }

  hasError(controlName: string, errorName: string) {
    return this.cineForm.controls[controlName].hasError(errorName);
  }

  cargaFormulario(cine: Cine) {
    this.cineForm.get('nombre').setValue(cine.nombre);
    this.cineForm.get('num_sala').setValue(cine.num_sala);
    this.cineForm.get('precio').setValue(cine.precio);
    this.cineForm.get('hora_inicio').setValue(cine.hora_inicio);
    this.cineForm.get('hora_fin').setValue(cine.hora_fin);
  }

  onSubmit() {
    const cineEditado: Cine = {
      nombre: this.cineForm.get('nombre').value,
      num_sala: this.cineForm.get('num_sala').value,
      precio: this.cineForm.get('precio').value,
      hora_inicio: this.cineForm.get('hora_inicio').value,
      hora_fin: this.cineForm.get('hora_fin').value
    };

    this.servicio.updateCine(this.idEditado, cineEditado).then(
      () => this.router.navigate(['cine'])
    );
  }

}
