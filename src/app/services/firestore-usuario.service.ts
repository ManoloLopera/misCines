import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsuarioService {

  constructor(private database: AngularFirestore) { }

  getUsuarios() {
    return this.database.collection<Usuario>('usuarios').snapshotChanges().pipe(
      map(
        usuarios => {
          return usuarios.map(
            usuario => {
              const data = usuario.payload.doc.data() as Usuario;
              return data;
            }
          );
        }
      )
    );
  }

  getUsuario(uid: string) {
    return this.database.collection<Usuario>('usuarios').doc(uid).snapshotChanges();
  }


}
