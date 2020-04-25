import { map } from 'rxjs/operators';
import { Cine } from './../models/cine';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCineService {

  constructor(private database: AngularFirestore) { }

  getCines() {
    return this.database.collection<Cine>('cine').snapshotChanges().pipe(
      map( cines => {
        return cines.map(
          cine => {
            const data = cine.payload.doc.data() as Cine;
            data.id = cine.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getCine(id: string) {
    return this.database.collection<Cine>('cine').doc(id).snapshotChanges();
  }

  addCine( cine: Cine) {
    return this.database.collection('cine').add(cine);
  }

  deleteCine( id: string) {
    return this.database.collection('cine').doc(id).delete();
  }

  updateCine(id: string, cine: Cine) {
    return this.database.collection('cine').doc(id).set(cine);
  }
}
