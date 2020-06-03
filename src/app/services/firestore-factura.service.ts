import { Factura } from './../models/factura';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreFacturaService {

  constructor(private database: AngularFirestore) { }
  getFacturas() {
    return this.database.collection<Factura>('factura').snapshotChanges().pipe(
      map( facturas => {
        return facturas.map(
          factura => {
            const data = factura.payload.doc.data() as Factura;
            data.id = factura.payload.doc.id;
            return data;
          }
        );
      })
    );
  }

  getFactura(id: string) {
    return this.database.collection<Factura>('factura').doc(id).snapshotChanges();
  }

  addFactura(factura: Factura) {
    return this.database.collection('factura').add(factura);
  }

  deleteFactura(id: string) {
    return this.database.collection('factura').doc(id).delete();
  }

  updateFactura(id: string, factura: Factura) {
    return this.database.collection('factura').doc(id).set(factura);
  }

  getFacturasPorSesion(idSesion: string) {
    const refPeliculas = this.database.collection<Factura>('factura').ref;
    const query = refPeliculas.where('idSesion', '==', idSesion);

    return query.get();
  }
}
