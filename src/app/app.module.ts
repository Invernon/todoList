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

// Views
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { WindowScrolling } from './services/utilities/window-scrolling';
import { HeaderComponent } from './components/header/header.component';
import { PageNavigationComponent } from './navigation/page-navigation/page-navigation.component';
import { LoginNavigationComponent } from './navigation/login-navigation/login-navigation.component';
import { WindowSize } from './services/utilities/window-size';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './views/users/users.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MultiFilterPipe } from './pipes/multi-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    LoginComponent,
    CustomModalComponent,
    HeaderComponent,
    PageNavigationComponent,
    LoginNavigationComponent,
    UsersComponent,
    LoadingScreenComponent,
    LoadingComponent,
    MultiFilterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    ListService,
    AngularFirestore,
    AuthService,
    AngularFireAuth,
    WindowScrolling,
    WindowSize

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
