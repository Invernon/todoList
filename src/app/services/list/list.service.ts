import { Injectable } from '@angular/core';
//Se importa Angular FireStore y FirestoreDocument , para poder interactuar con afs
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// Se agrega la libreria de rxjs/Observables para poder utilizar la data traida de FireStore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(
    private afs: AngularFirestore,
  ) { }

    private path: string = '/tasks'

  // Crear una tarea
  public createTask(data: {name: string, type: string, detail: string}) {
    return this.afs.collection(this.path).add(data);
  }

   //Obtiene una tarea
   public getTask(documentId: string) {
    return this.afs.collection(this.path).doc(documentId).snapshotChanges();
  }

  //Obtiene todas las tareas
  public getTasks() {
    return this.afs.collection(this.path , ref => ref.orderBy('name') ).snapshotChanges();
  }

  //Actualiza un gato
  public updateTask(documentId: string, data: any) {
    return this.afs.collection(this.path).doc(documentId).set(data);
  }
  //Actualiza un gato
  public deleteTask(documentId: string) {
    return this.afs.collection(this.path).doc(documentId).delete();
  }
}
