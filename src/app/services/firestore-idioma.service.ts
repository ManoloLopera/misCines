import { map } from 'rxjs/operators';
import { Idioma } from './../models/idioma';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreIdiomaService {

  constructor(private database: AngularFirestore) { }

  getIdiomas() {
    return this.database.collection<Idioma>('idioma').snapshotChanges().pipe(
      map( idiomas => {
        return idiomas.map(
          idioma => {
            const data = idioma.payload.doc.data() as Idioma;
            data.id = idioma.payload.doc.id;
            return data;
        });
      })
    );
  }

  getIdioma(id: string) {
    return this.database.collection<Idioma>('idioma').doc(id).snapshotChanges();
  }

  addIdioma(idioma: Idioma) {
    return this.database.collection('idioma').add(idioma);
  }

  deleteIdioma(id: string) {
    return this.database.collection('idioma').doc(id).delete();
  }

  updateIdioma(id: string, idioma: Idioma) {
    return this.database.collection('idioma').doc(id).set(idioma);
  }
}
