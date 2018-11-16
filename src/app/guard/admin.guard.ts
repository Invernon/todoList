import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: any;
  isAdmin = new Subject;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.profile$.pipe(
        map( data  => data.data.admin ),
        tap ( data => {
          if ( data ) {

          } else {
            alert('you shall NO pass');
            this.router.navigate(['dashboard']);
          }
        })
      );
  }
}
