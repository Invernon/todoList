import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: {};
  path: '/users';
 
  constructor(private afs:AngularFirestore, private afAuth: AngularFireAuth, private authService:AuthService) { 
    this.authService.user.subscribe( data => {
      this.user = data;
    })

  }

  public getActualUser(){
    return this.user;
  }

    //Crear un usuario
    public createUser(data: {name: string, email: string, type: string, tasks:[] } ) {
      return this.afs.collection(this.path).add(data);
  }



}
