import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MenuComponent, FooterComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class ComponentesModule { }
