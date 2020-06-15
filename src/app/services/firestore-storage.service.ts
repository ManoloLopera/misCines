import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreStorageService {

  constructor(private storage: AngularFireStorage) { }

  cloudStorage(nombreArchivo: string, datos: any): AngularFireUploadTask {
    return this.storage.upload(nombreArchivo, datos);
  }

  referenceCloudStorage(nombreArchivo: string): AngularFireStorageReference {
    return this.storage.ref(nombreArchivo);
  }
}
