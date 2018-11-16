import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service';
import { first, tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLogged = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
  ) {

   }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      switchMap(user => of(!!user)),
      tap(isLogged => {
        if (isLogged) {
          // console.log('Esta Logeado', isLogged);
        } else {
          // console.log('No Logeado', isLogged);
          alert('You don`t have permission to view this page');
          this.router.navigate(['login']);
        }
    }));
  }
}
