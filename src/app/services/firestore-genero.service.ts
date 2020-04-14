import { Genero } from './../models/genero';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreGeneroService {

  constructor(private database: AngularFirestore) { }

  getGeneros() {
    return this.database.collection<Genero>('genero').snapshotChanges().pipe(
      map( generos => {
          return generos.map(
            genero => {
              const data = genero.payload.doc.data() as Genero;
              data.id = genero.payload.doc.id;
              return data;
            }
          );
        }
      )
    );
  }

  getGenero(id: string) {
    return this.database.collection<Genero>('genero').doc(id).snapshotChanges();
  }

  addGenero(genero: Genero) {
    return this.database.collection('genero').add(genero);
  }

  deleteGenero(id: string) {
    return this.database.collection('genero').doc(id).delete();
  }

  updateGenero(id: string, genero: Genero) {
    return this.database.collection('genero').doc(id).set(genero);
  }

}
