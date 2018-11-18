import { Injectable } from '@angular/core';
// Se importa Angular FireStore y FirestoreDocument , para poder interactuar con afs
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// Se agrega la libreria de rxjs/Observables para poder utilizar la data traida de FireStore
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/user';
import { switchMap, map } from 'rxjs/operators';
import { firestore } from 'firebase';

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

  // Crear una tarea
  async createTask(
    data: {
      name: string,
      type: string,
      detail: string,
      priority: string
    }
  ) {
    return this.authService.profile$.subscribe(profile => {
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
          return this.afs.doc(profile.ref.path).collection(this.taskPath).snapshotChanges();
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

  // middleware para comprobar el array de orden de las task.
  public checkTaskOrder() {
    return this.authService.profile$.pipe(
      switchMap(profile => {
        if (profile) {
          return this.afs.doc(profile.ref.path).snapshotChanges().pipe(
            map( data  => {
              if ( !data.payload.data().taskOrder ) {
                console.log('No tiene task Orders');
                this.fillTaskArray( profile.ref.path );
                return data;
              } else {
                console.log('Ya tiene task Orders');
                return null;
              }
            })
          );
        }
      })
    );
  }

public fillTaskArray(path) {
  const array = [];
  const aux = [];
  this.getTasks().subscribe( (taskSnapshots) => {
    (array as any) = taskSnapshots.map(snap => {
      const obj = {
        ref: snap.payload.doc.id,
      };
      return obj;
    }
  );
  array.forEach(element => {
    aux.push(element.ref);
  });
    this.createTaskArray( path , aux );
  });

}

createTaskArray( path , array ) {
  this.afs.doc(path).set({
    taskOrder: firestore.FieldValue.arrayUnion(...array)
  }, {merge: true});
}

updateTaskArray( taskArray ) {
  this.authService.getProfile().then(profile => {
    return  this.afs.doc(profile.ref.path).set({
      taskOrder: firestore.FieldValue.arrayUnion(...taskArray)
    }, {merge : true});
  });
}


}
