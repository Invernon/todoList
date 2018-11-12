import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;
  private userPath: string = '/users'
 
  constructor(private afs:AngularFirestore, private afAuth: AngularFireAuth, private authService:AuthService) { 
    this.authService.user.subscribe( data => {
      this.user = data;
    })
  }

  public getActualUser(){
    return this.user;
  }

  public isAdmin(){
    return this.afs.collection(this.userPath).doc(this.user.uid).get()
  }

    //Crear un usuario
    public createUser(data: {email: string, password: string, name:string, admin: boolean} , user:any) {
      let id = user.user.uid;
      let newUser = {
        email: user.user.email,
        name: (user.user.displayName) ? user.user.displayName : data.name,
        admin: data.admin,   
      };
      
      return this.afs.collection(this.userPath).doc(id).set(
        {...newUser},
        {merge:true }
      );
  }



}
