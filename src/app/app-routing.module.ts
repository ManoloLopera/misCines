import { SinopsisComponent } from './sinopsis/sinopsis.component';
import { DialogComentComponent } from './componentes/dialog-coment/dialog-coment.component';
import { SinopsisPeliculaComponent } from './sinopsispelicula/sinopsispelicula.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'sinopsis',
    component: SinopsisComponent
  },
  {
    path: 'mantenimiento',
    loadChildren: './../app/mantenimiento/mantenimiento.module#MantenimientoModule'
  },
  {
    path: 'sinopsis/:id',
    component: SinopsisPeliculaComponent,
    children: [
      {
        path: 'dialogComent',
        component: DialogComentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
