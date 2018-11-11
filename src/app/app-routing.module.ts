import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './views/task/task.component';
import { LoginComponent } from './views/login/login.component';
import { CanActivate } from "@angular/router";
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: 'task',
    canActivate: [AuthGuard] ,
    children: [
      { path: '', component: TaskComponent},
    ]
  },
  { path: 'login', canActivate: [AuthGuard] , component: LoginComponent },
  { path: '**', redirectTo: '/login', },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
