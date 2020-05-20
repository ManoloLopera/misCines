import { DatePipe } from '@angular/common';
import { DialogComentComponent } from './componentes/dialog-coment/dialog-coment.component';
import { AuthService } from './services/auth.service';
import { LoginRegisterModule } from './login-register/login-register.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { ComponentesModule } from './componentes/componentes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SinopsisPeliculaComponent } from './sinopsispelicula/sinopsispelicula.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import 'firebase/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SinopsisPeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentesModule,
    MantenimientoModule,
    LoginRegisterModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatTooltipModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatExpansionModule
  ],
  entryComponents: [
    DialogComentComponent
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
