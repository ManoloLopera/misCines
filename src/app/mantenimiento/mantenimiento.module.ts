import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
// import { NgxMatFileInputModule } from '@angular-material-components/file-input';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewIdiomaComponent } from './new-idioma/new-idioma.component';
import { NewGeneroComponent } from './new-genero/new-genero.component';
import { NewPeliculaComponent } from './new-pelicula/new-pelicula.component';
import { NewCineComponent } from './new-cine/new-cine.component';
import { NewSesionComponent } from './new-sesion/new-sesion.component';
import { DetPeliculaComponent } from './det-pelicula/det-pelicula.component';
import { EditGeneroComponent } from './edit-genero/edit-genero.component';
import { EditCineComponent } from './edit-cine/edit-cine.component';
import { EditIdiomaComponent } from './edit-idioma/edit-idioma.component';
import { EditPeliculaComponent } from './edit-pelicula/edit-pelicula.component';
import { NewSalaComponent } from './new-sala/new-sala.component';
import { EditSalaComponent } from './edit-sala/edit-sala.component';
import { EditSesionComponent } from './edit-sesion/edit-sesion.component';

const routes: Routes = [
  {path: 'genero', component: GeneroComponent},
  {path: 'idioma', component: IdiomaComponent},
  {path: 'cine', component: CineComponent},
  {path: 'pelicula', component: PeliculaComponent},
  {path: 'salas', component: SalaComponent},
  {path: 'sesion', component: SesionComponent},
  {path: 'new-idioma', component: NewIdiomaComponent},
  {path: 'new-genero', component: NewGeneroComponent},
  {path: 'new-pelicula', component: NewPeliculaComponent},
  {path: 'new-cine', component: NewCineComponent},
  {path: 'new-sala', component: NewSalaComponent},
  {path: 'new-sesion', component: NewSesionComponent},
  {path: 'det-pelicula/:id', component: DetPeliculaComponent},
  {path: 'genero/:id', component: EditGeneroComponent},
  {path: 'cine/:id', component: EditCineComponent},
  {path: 'idioma/:id', component: EditIdiomaComponent},
  {path: 'pelicula/:id', component: EditPeliculaComponent},
  {path: 'sala/:id', component: EditSalaComponent},
  {path: 'sesion/:id', component: EditSesionComponent}
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
    // NgxMatFileInputModule,
    AngularFireStorageModule,
    RouterModule.forChild(routes)
  ]
})
export class MantenimientoModule { }
