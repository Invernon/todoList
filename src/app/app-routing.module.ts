import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './views/task/task.component';
import { LoginComponent } from './views/login/login.component';
import { CanActivate } from "@angular/router";
import { AuthGuard } from './guard/auth.guard';
import { PageNavigationComponent } from './navigation/page-navigation/page-navigation.component';
import { LoginNavigationComponent } from './navigation/login-navigation/login-navigation.component';


const routes: Routes = [
  {path:'', 
    children: [
    {
      path: 'task',
      canActivate: [AuthGuard] ,
      children: [
        { path: '', component: TaskComponent},
      ]
    },
    ],component : PageNavigationComponent,
  },
  
  { path: 'login' ,
    children:[
      { path:'', component:LoginComponent }
    ],
    component: LoginNavigationComponent
  },
  
  { path: '**', redirectTo: '/login', },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
