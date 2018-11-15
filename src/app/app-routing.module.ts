import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './views/task/task.component';
import { LoginComponent } from './views/login/login.component';
import { CanActivate } from "@angular/router";
import { AuthGuard } from './guard/auth.guard';
import { PageNavigationComponent } from './navigation/page-navigation/page-navigation.component';
import { LoginNavigationComponent } from './navigation/login-navigation/login-navigation.component';
import { AdminGuard } from './guard/admin.guard';
import { UsersComponent } from './views/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: PageNavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'task' , pathMatch: 'full'
      },
      {
        path: 'task',
        children: [
          { path: '', component: TaskComponent },
        ]
      }
    ]
  },
  {
    path: 'admin',
    component: PageNavigationComponent,
    // canActivate: [AdminGuard],
    // canActivateChild: [AdminGuard],
    children: [
      { path: 'users', component: UsersComponent },
    ],
  },
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent }
    ], component: LoginNavigationComponent
  },

  { path: '**', redirectTo: '/login', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
