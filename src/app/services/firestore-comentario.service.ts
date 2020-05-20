import { Comentario } from './../models/comentario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreComentarioService {

  constructor(private database: AngularFirestore) { }

  getComentarios() {
    return this.database.collection<Comentario>('comentarios').snapshotChanges().pipe(
      map( comentarios => {
        return comentarios.map(
          comentario => {
            const data = comentario.payload.doc.data() as Comentario;
            data.id = comentario.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getComentario(id: string) {
    return this.database.collection<Comentario>('comentarios').doc(id).snapshotChanges();
  }

  addComentario(comentario: Comentario) {
    return this.database.collection('comentarios').add(comentario);
  }

  deleteComentario(id: string) {
    return this.database.collection('comentarios').doc(id).delete();
  }

  updateComentario(id: string, comentario: Comentario) {
    return this.database.collection('comentarios').doc(id).set(comentario);
  }

  comentariosPorPelicula(idPelicula: string) {
    const refComentarios = this.database.collection<Comentario>('comentarios').ref;

    const query = refComentarios.where('idPelicula', '==', idPelicula);

    return query.get();
  }
}
