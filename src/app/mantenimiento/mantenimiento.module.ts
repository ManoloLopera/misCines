import { AuthGuardService } from './../services/auth-guard.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GeneroComponent } from './genero/genero.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { CineComponent } from './cine/cine.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { SalaComponent } from './sala/sala.component';
import { SesionComponent } from './sesion/sesion.component';

import { NewIdiomaComponent } from './new-idioma/new-idioma.component';
import { NewGeneroComponent } from './new-genero/new-genero.component';
import { NewPeliculaComponent } from './new-pelicula/new-pelicula.component';
import { NewCineComponent } from './new-cine/new-cine.component';
import { NewSesionComponent } from './new-sesion/new-sesion.component';
import { NewSalaComponent } from './new-sala/new-sala.component';

import { DetPeliculaComponent } from './det-pelicula/det-pelicula.component';

import { EditGeneroComponent } from './edit-genero/edit-genero.component';
import { EditCineComponent } from './edit-cine/edit-cine.component';
import { EditIdiomaComponent } from './edit-idioma/edit-idioma.component';
import { EditPeliculaComponent } from './edit-pelicula/edit-pelicula.component';
import { EditSalaComponent } from './edit-sala/edit-sala.component';
import { EditSesionComponent } from './edit-sesion/edit-sesion.component';

const routes: Routes = [
  {
    path: 'genero',
    component: GeneroComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'idioma',
    component: IdiomaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cine',
    component: CineComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pelicula',
    component: PeliculaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'salas',
    component: SalaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sesion',
    component: SesionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-idioma',
    component: NewIdiomaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-genero',
    component: NewGeneroComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-pelicula',
    component: NewPeliculaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-cine',
    component: NewCineComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-sala',
    component: NewSalaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-sesion',
    component: NewSesionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'det-pelicula/:id',
    component: DetPeliculaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'genero/:id',
    component: EditGeneroComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cine/:id',
    component: EditCineComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'idioma/:id',
    component: EditIdiomaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pelicula/:id',
    component: EditPeliculaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sala/:id',
    component: EditSalaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sesion/:id',
    component: EditSesionComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  declarations: [GeneroComponent, IdiomaComponent, CineComponent, PeliculaComponent, SalaComponent, SesionComponent
    , NewIdiomaComponent, NewGeneroComponent, NewPeliculaComponent, NewCineComponent, NewSesionComponent, DetPeliculaComponent,
    EditGeneroComponent, EditCineComponent, EditIdiomaComponent, EditPeliculaComponent, NewSalaComponent,
    EditSalaComponent, EditSesionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    FontAwesomeModule,
    AngularFireModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ]
})
export class MantenimientoModule { }
