import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User = null;

  constructor(private auth: AngularFireAuth, private database: AngularFirestore) { }

  isAuthenticated() {
    if (this.user == null) {
        return false;
    } else {
        return true;
    }
  }

  doLogin(email: string, password: string) {
      return this.auth.signInWithEmailAndPassword(email, password).then(
          (userCredentials) => {
            this.user = userCredentials.user;
          }
      );
  }

  doLogout() {
      if (this.user != null) {
          return this.auth.signOut().then(
              res => this.user = null
          );
      }
  }

  register(email: string, password: string, name: string) {
      return new Promise ((resolve, reject) => {
        this.auth.createUserWithEmailAndPassword(email, password).then(
            async res => {
              const uid = res.user.uid;
              this.database.collection('usuarios').doc(uid).set({
                  name,
                  uid,
                  role: 'User'
              });
              (await this.auth.currentUser).updateProfile({
                  displayName: name
              });
              resolve(res);
        }).catch( err => reject(err));
      });
  }

}
