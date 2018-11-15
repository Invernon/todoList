import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Creamos una variable que se llama user y se le asigna el tipo Observable con las propiedades de
  // un usuario de Firebase, con sus respectivos Métodos.
  public user : Observable<firebase.User>;
  public isAdmin : boolean; 
  public user$: Observable<any>

  constructor( private afAuth:AngularFireAuth, private afs:AngularFirestore, private router:Router ) {
    this.user = afAuth.authState;
  
    // this.user$ = this.afAuth.authState.pipe(
    //     switchMap( user => {
    //     if (user){
    //       return this.afs.collection('/users').doc(user.uid).valueChanges()
    //     }else{
    //       return Observable.throw(null)
    //     }
    //   }) 
    // )
    
    // Verificamos si el usuario es Admin y lo colocamos en el servicio.
    
    this.user.subscribe( data => {
      this.afs.collection('/users').doc(data.uid).get().subscribe( user => {
        this.isAdmin = user.data().admin; 
      })
    })
  }

  loginByEmail( email:string, password:string ){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  registerByEmail( email:string , password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  registerByEmailAdmin( email:string , password: string){
    if( this.isAdmin ){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    }
    else{
      return this.throwError()
    }
  }

  //Logout Method. 
  logout():void{
    this.afAuth.auth.signOut()
    .then( data => {
      this.router.navigate(['login'])
    })
    .catch( err => {
        console.log(err.message)
    })      
  }

  getUser(){
    return this.user; 
  }

  throwError() {
    return new Promise<any>( () => {
      throw new Error('You Shouldn`t be here');
    });
}


}