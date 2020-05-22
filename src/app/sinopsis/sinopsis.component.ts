import { Pelicula } from './../models/pelicula';
import { FirestorePeliculaService } from './../services/firestore-pelicula.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sinopsis',
  templateUrl: './sinopsis.component.html',
  styleUrls: ['./sinopsis.component.css']
})
export class SinopsisComponent implements OnInit {

  listaPeliculas: Pelicula[];
  constructor(private servicioPelicula: FirestorePeliculaService) { }

  ngOnInit(): void {
    this.servicioPelicula.getPeliculas().subscribe(
      (peliculas) => {
        this.listaPeliculas = peliculas ;
      }
    );
  }

}
