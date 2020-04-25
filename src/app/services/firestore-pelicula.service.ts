import { Pelicula } from './../models/pelicula';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorePeliculaService {

  constructor(private database: AngularFirestore) { }

  getPeliculas() {
    return this.database.collection<Pelicula>('pelicula').snapshotChanges().pipe(
      map( peliculas => {
        return peliculas.map(
          pelicula => {
            const data = pelicula.payload.doc.data() as Pelicula;
            data.id = pelicula.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getPelicula(id: string) {
    return this.database.collection<Pelicula>('pelicula').doc(id).snapshotChanges();
  }

  addPelicula( pelicula: Pelicula) {
    return this.database.collection('pelicula').add(pelicula);
  }

  deletePelicula( id: string) {
    return this.database.collection('pelicula').doc(id).delete();
  }

  updatePelicula(id: string, pelicula: Pelicula) {
    return this.database.collection('pelicula').doc(id).set(pelicula);
  }
}
