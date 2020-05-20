import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { DialogComentComponent } from './dialog-coment/dialog-coment.component';
import { FooterComponent } from './footer/footer.component';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [MenuComponent, FooterComponent, DialogComentComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    DialogComentComponent
  ]
})
export class ComponentesModule { }
