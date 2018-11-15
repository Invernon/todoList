import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: any;
  isAdmin = new Subject;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserService
  ) {
      //Verificamos si el usuario es Admin y lo colocamos en el servicio.

      // this.authService.user.pipe(
      //   take(1),
      //   map(user => user.  ?  true : false),
      //   tap(isAdmin => {
      //     console.log(isAdmin)
      //     if(isAdmin){
      //       console.error('EEEEE')
      //     }
      //   })
      // )

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true
      // this.afAuth.authState.subscribe( data => {
      //   this.afs.collection('/users').doc(data.uid).get().subscribe( user => {
      //     if( user.data().admin )
      //       return true
      //     else {
      //       return false
      //       }
      //   })
      // })

      // return this.afAuth.authState.pipe(
      //   take(1),
      //   switchMap( user => {
      //     return this.userService.getActualUser().uid
      //     }),
      //   map( profile => !!(profile[0].admin) ),
      //   tap( isAdmin => {
      //     if( isAdmin ){
      //       console.log('you shall pass')
      //     }else{
      //       console.log('you shall NO pass')
      //       this.router.navigate(['/']);
      //     }
      //   })
      // )
  }
}
