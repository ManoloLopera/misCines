import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GeneroComponent } from './genero/genero.component';


const routes: Routes = [
  {path: 'genero', component: GeneroComponent},
];
@NgModule({
  declarations: [GeneroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MantenimientoModule { }
