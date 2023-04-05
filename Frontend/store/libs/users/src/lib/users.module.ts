import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';



export const usersRoutes: Route[] = [
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule.forChild(usersRoutes)],
  declarations: [
    LoginComponent
  ],

})
export class UsersModule { }
