import { Injectable } from '@angular/core';
//Se importa Angular FireStore y FirestoreDocument , para poder interactuar con afs
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// Se agrega la libreria de rxjs/Observables para poder utilizar la data traida de FireStore
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  user: any;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private userService: UserService
  ) { 
 
    this.authService.getUser().subscribe(data => {
      this.user = data;
    })

    console.log(this.user)
    // this.user = this.userService.getActualUser();

   }

    private taskPath: string = '/tasks'
    private userPath: string = '/users'

  // Crear una tarea
  public createTask(data: {name: string, type: string, detail: string, priority:string}) {
    return this.afs.collection(this.userPath).doc(this.user.uid).collection(this.taskPath).add(data);
  }

  //Obtiene una tarea
  public getTask(documentId: string) {
    return this.afs.collection(this.userPath).doc(this.user.uid).collection(this.taskPath).doc(documentId).snapshotChanges();
  }

  //Obtiene todas las tareas
  public getTasks() {
    return this.afs.collection(this.userPath).doc(this.user.uid).collection(this.taskPath , ref => ref.orderBy('name') ).snapshotChanges();
  }

  //Actualiza una tarea para un Usuario
  public updateTask(documentId: string, data: any) {
    return this.afs.collection(this.userPath).doc(this.user.uid).collection(this.taskPath).doc(documentId).set(data);
  };

  //Actualiza una tarea
  public deleteTask(documentId: string) {
    return this.afs.collection(this.userPath).doc(this.user.uid).collection(this.taskPath).doc(documentId).delete();
  }
}
