import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Creamos una variable que se llama user y se le asigna el tipo Observable con las propiedades de
  // un usuario de Firebase, con sus respectivos Métodos.
  public user : Observable<firebase.User>;

  constructor( private firebaseAuth:AngularFireAuth, private router:Router ) {
    this.user = firebaseAuth.authState;
  }

  loginByEmail( email:string, password:string ){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password);
  }

  registerByEmail( email:string , password: string){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  logout(){
    this.router.navigate(['login'])
    this.firebaseAuth.auth.signOut();
  }

  getUser(){
    return this.user; 
  }



}