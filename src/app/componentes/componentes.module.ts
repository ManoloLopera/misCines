import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [MenuComponent, FooterComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatMenuModule,
    MatToolbarModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class ComponentesModule { }
