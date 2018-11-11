import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ListService } from './services/list/list.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskComponent } from './views/task/task.component';
import { AppRoutingModule } from './app-routing.module';

//Views
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UserService,
    ListService,
    AngularFirestore,
    AuthService,
    AngularFireAuth

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
