import { FirestoreUsuarioService } from './../../services/firestore-usuario.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as firebase from 'Firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

import { faSignOutAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  state: Observable<firebase.User>;

  // Icon
  exit = faSignOutAlt;
  verified = faStar;
  role: string;
  constructor(
    private _firebaseAuth: AngularFireAuth,
    public auth: AuthService,
    public serviceUser: FirestoreUsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    // Observable of authentication state
    this.state = _firebaseAuth.authState;

    this.state.subscribe(
      (user) => {
        if (user) {
          this.auth.user = user;
          this.isAdmin(this.auth.user).subscribe(
            rol => {
              this.role = rol;
            }
          );
          this._snackBar.open('Bienvenido ' + this.auth.user.displayName + ' !', '', {
            duration: 2000
          });
        } else {
          this.auth.user = null;
        }

      }
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.doLogout();
    this.router.navigateByUrl('');
    this._snackBar.open('Hasta pronto', '', {
      duration: 2000
    });
  }

  isAdmin(user: firebase.User) {
    let role;
    const subject = new Subject<string>();
    this.serviceUser.getUsuario(user.uid).subscribe(
      usuario => {
        role = usuario.payload.get('role');
        subject.next(role);
      }
    );
    return subject.asObservable();
  }
}
