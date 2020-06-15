import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this._snackBar.open('Tienes que estar loggeado para acceder aquí', '', {
        duration: 2000
      });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
