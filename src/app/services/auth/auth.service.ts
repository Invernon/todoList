import { Injectable } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static usersPath = '/users';
  // Creamos una variable que se llama user y se le asigna el tipo Observable con las propiedades de
  // un usuario de Firebase, con sus respectivos Métodos.
  public user$: Observable<firebase.User>;
  public profile$: Observable<{
    data: User,
    ref: firebase.firestore.DocumentReference
   } | null>;


  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router ) {
    this.user$ = afAuth.authState;

    this.profile$ = this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.collection(AuthService.usersPath).doc(user.uid).snapshotChanges();
        } else {
          return null;
        }
      }),
      map((snapshot: any) => {
        if (snapshot) {
          return {
            data: snapshot.payload.data() as User,
            ref: snapshot.payload.ref
          };
        } else {
          return snapshot;
        }
      })
    );

  }

  loginByEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async registerByEmail(email: string , password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      return this.createUserProfile(user.user.uid, user.user.email, displayName || user.user.displayName);
    });
  }

  createUserProfile(uid: string, email: string, displayName?: string, isAdmin?: boolean) {
    return this.afs.collection(AuthService.usersPath).doc(uid).set(
      {
        email: email,
        name: displayName || 'Sin Nombre',
        admin: isAdmin || false,
      },
      {
        merge: true
      }
    );
  }

  async registerByEmailAdmin(email: string, password: string, displayName?: string, isAdmin?: boolean) {
    return this.profile$.pipe(
      first()
    ).toPromise().then((profile) => {
      if (profile.data.admin) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
          return this.createUserProfile(user.user.uid, user.user.email, displayName || user.user.displayName, isAdmin);
        });
      } else {
        throw new Error('You Shouldn`t be here');
      }
    });
  }

  // Login with Google Button
  async loginByGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider;
    return this.afAuth.auth.signInWithPopup(googleProvider).then( (user: any) => {
      if ( this.afs.collection(AuthService.usersPath).doc(user.user.uid) ) {
        console.log( 'Welcome ' , user.user.displayName );
      } else {
        return this.createUserProfile( user.user.uid , user.user.email, user.user.displayName );
      }
    });
  }

  // Logout Method.
  logout() {
    this.afAuth.auth.signOut()
      .then( data => {
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  getProfile() {
    return this.profile$.pipe(first()).toPromise();
  }
}
