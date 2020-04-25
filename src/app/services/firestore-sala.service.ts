import { Sala } from './../models/sala';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreSalaService {

  constructor(private database: AngularFirestore) { }

  getSalas() {
    return this.database.collection<Sala>('sala').snapshotChanges().pipe(
      map( salas => {
        return salas.map(
          sala => {
            const data = sala.payload.doc.data() as Sala;
            data.id = sala.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getSala(id: string) {
    return this.database.collection<Sala>('sala').doc(id).snapshotChanges();
  }

  addSala( sala: Sala) {
    return this.database.collection('sala').add(sala);
  }

  deleteSala( id: string) {
    return this.database.collection('sala').doc(id).delete();
  }

  updateSala(id: string, sala: Sala) {
    return this.database.collection('sala').doc(id).set(sala);
  }
}
