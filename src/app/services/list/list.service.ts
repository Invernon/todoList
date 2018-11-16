import { Injectable } from '@angular/core';
// Se importa Angular FireStore y FirestoreDocument , para poder interactuar con afs
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// Se agrega la libreria de rxjs/Observables para poder utilizar la data traida de FireStore
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private userService: UserService
  ) { }

    private taskPath = '/tasks';
    private userPath = '/users';

  // Crear una tarea
  async createTask(
    data: {
      name: string,
      type: string,
      detail: string,
      priority: string
    }
  ) {
    return this.authService.profile$.subscribe( profile => {
      if (profile) {
        return this.afs.doc(profile.ref.path).collection(this.taskPath).add(data);
      }
    });
  }

  // Obtiene una tarea
  public getTask(documentId: string) {
    return this.authService.profile$.pipe(
      switchMap(profile => {
        if (profile) {
          return this.afs.doc(profile.ref.path).collection(this.taskPath).doc(documentId).snapshotChanges();
        }
      })
    );
  }

  // Obtiene todas las tareas
  public getTasks() {
    return this.authService.profile$.pipe(
      switchMap(profile => {
        if (profile) {
          return this.afs.doc(profile.ref.path).collection(this.taskPath, ref => ref.orderBy('name') ).snapshotChanges();
        }
      })
    );
  }

  // Actualiza una tarea para un Usuario
  public updateTask(documentId: string, data: any) {
    this.authService.getProfile().then(profile => {
      return this.afs.doc(profile.ref.path).collection(this.taskPath).doc(documentId).set(data);
    });
  }

  // Actualiza una tarea
  public deleteTask(documentId: string) {
    this.authService.getProfile().then(profile => {
      return this.afs.doc(profile.ref.path).collection(this.taskPath).doc(documentId).delete();
    });
  }
}
