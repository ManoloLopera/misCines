import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreStorageService {

  constructor(private storage: AngularFireStorage) { }

  cloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  referenceCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
