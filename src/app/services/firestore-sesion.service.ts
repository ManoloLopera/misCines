import { Sesion } from './../models/sesion';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreSesionService {

  constructor(private database: AngularFirestore) { }

  getSesiones() {
    return this.database.collection<Sesion>('sesion').snapshotChanges().pipe(
      map( sesiones => {
        return sesiones.map(
          sesion => {
            const data = sesion.payload.doc.data() as Sesion;
            data.id = sesion.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getSesion(id: string) {
    return this.database.collection<Sesion>('sesion').doc(id).snapshotChanges();
  }

  getSesionesPorFecha(fecha_sesion: string) {
    const refPeliculas = this.database.collection<Sesion>('sesion').ref;
    const query = refPeliculas.where('fecha_sesion', '==', fecha_sesion);

    return query.get();
  }

  addSesion(sesion: Sesion) {
    return this.database.collection('sesion').add(sesion);
  }

  deleteSesion(id: string) {
    return this.database.collection('sesion').doc(id).delete();
  }

  updateSesion(id: string , sesion: Sesion) {
    return this.database.collection('sesion').doc(id).set(sesion);
  }
}
