import { Genero } from './../../models/genero';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-genero',
  templateUrl: './new-genero.component.html',
  styleUrls: ['./new-genero.component.css']
})
export class NewGeneroComponent implements OnInit {

  volver = faDoorOpen;
  generoForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    descripcion: new FormControl('', Validators.required)
  });
  constructor(private router: Router, private servicio: FirestoreGeneroService) { }

  ngOnInit(): void {
  }

  hasError(controlName: string, errorName: string) {
    return this.generoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.generoForm.valid) {
      const generoNuevo: Genero = {
        nombre: String(this.generoForm.get('nombre').value),
        descripcion: String(this.generoForm.get('descripcion').value)
      };

      this.servicio.addGenero(generoNuevo).then(
        () => this.router.navigate(['genero'])
      );
    }
  }

}
