import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { TodoService } from './todo.service';
import { UserService } from './user.service';
import { DepositService } from './deposit.service';
import { SigninService } from './signin.service';
import { LoginComponent } from './login/login.component';
import { TransferComponent } from './levantar/levantar.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { DepositComponent } from './depositar/deposit.component';
import { SigninComponent } from './signin/signin.component';
import { MovListComponent } from './mov-list/mov-list.component';
import { MovService } from './mov.service';
import { TransferService } from './transfer.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    UserListComponent,
    LoginComponent,
    TransferComponent,
    DepositComponent,
    MovListComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [
    TodoService,
    UserService,
    AuthService,
    DepositService,
    TransferService,
    SigninService,
    MovService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
