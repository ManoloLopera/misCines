import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { FirestoreGeneroService } from './../services/firestore-genero.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formattedDate: string;
  minDate: Date;
  maxDate: Date;
  constructor(private generoService: FirestoreGeneroService, private peliculaService: FirestorePeliculaService) {
    // Current Date
    this.minDate = new Date();
    // Máximo dos semanas
    this.maxDate = new Date(this.minDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  }

  ngOnInit(): void {
  }

  // Aquí le doy formato a la fecha que sale del DatePicker
  first(event: MatDatepickerInputEvent<Date>) {
    // const fecha = event.value.format('DD-MM-YYYY');
    const fecha = new Date (event.value);
    // Necesito DD (sin esto de los días 1-9 obtengo '1', y necesito '01')
    const dia = ('0' + fecha.getDate()).slice(-2);
    // Le tengo que sumar 1 porque sino me da el mes anterior (ya sabemos cómo funcionan los arrays y su índice 0)
    // Y el '0' es porque por ejemplo en febrero (contando el +1) me devuelve '2', y necesito el '02'
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const año = fecha.getFullYear();
    this.formattedDate = año + '-' + mes + '-' +  dia ;
  }

}
