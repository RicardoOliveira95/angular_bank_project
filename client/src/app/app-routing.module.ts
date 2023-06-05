import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DepositComponent } from './depositar/deposit.component';
import { TransferComponent } from './levantar/levantar.component';
import { MovListComponent } from './mov-list/mov-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'depositar', component: DepositComponent, canActivate: [AuthGuard]},
  { path: 'levantar', component: TransferComponent, canActivate: [AuthGuard]},
  { path: 'movimentos', component: MovListComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: 'login', component: LoginComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'todos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
