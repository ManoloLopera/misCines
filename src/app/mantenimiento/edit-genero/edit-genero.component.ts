import { Genero } from 'src/app/models/genero';
import { FirestoreGeneroService } from './../../services/firestore-genero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-genero',
  templateUrl: './edit-genero.component.html',
  styleUrls: ['./edit-genero.component.css']
})
export class EditGeneroComponent implements OnInit {

  idEditado;
  genero: Genero = {nombre: '', descripcion: ''};
  generoForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    descripcion: new FormControl('', Validators.required)
  });
  constructor(private route: ActivatedRoute, private router: Router, private servicio: FirestoreGeneroService) { }

  ngOnInit(): void {
    this.idEditado = this.route.snapshot.paramMap.get('id');

    this.servicio.getGenero(this.idEditado).subscribe(
      (editado) => {
        this.genero = {
          nombre: editado.payload.get('nombre'),
          descripcion: editado.payload.get('descripcion')
        };
        this.cargaFormulario(this.genero);
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.generoForm.controls[controlName].hasError(errorName);
  }

  cargaFormulario(genero: Genero) {
    this.generoForm.get('nombre').setValue(genero.nombre);
    this.generoForm.get('descripcion').setValue(genero.descripcion);
  }

  onSubmit() {
    const generoEditado: Genero = {
      nombre: this.generoForm.get('nombre').value,
      descripcion: this.generoForm.get('descripcion').value
    };

    this.servicio.updateGenero(this.idEditado, generoEditado).then(
      () => this.router.navigate(['genero'])
    );
  }

}
