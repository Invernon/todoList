import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;
  private userPath = '/users';

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private authService:AuthService) {
    // this.authService.user.subscribe( data => {
    //   this.user = data;
    // })
  }

  public getActualUser() {
    return this.authService.getProfile();
  }

  // public isAdmin(){
  //   return this.afs.collection(this.userPath).doc(this.user.uid).get()
  // }

  // Crear un usuario
  public createUser(data: {email: string, password: string, name: string, admin: boolean} , user: any) {

  }
}
