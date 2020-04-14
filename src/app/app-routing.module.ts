import { GeneroComponent } from './mantenimiento/genero/genero.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'genero', component: GeneroComponent},
  {path: 'mantenimiento', loadChildren: './../app/mantenimiento/mantenimiento.module#MantenimientoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
