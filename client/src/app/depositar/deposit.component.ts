import { Component, OnInit } from '@angular/core';
import { DepositService } from '../deposit.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './deposit.component.html'
})
export class DepositComponent {
  public quantia: number;
  public saldo: Todo;
  public error: string;
  todos$: Observable<Todo[]>;

  constructor(private auth: DepositService, private router: Router,private todos:TodoService) { }

  public submit() {
    this.todos$=this.todos.getTodos();
    
    this.auth.deposit(this.quantia)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['todos']),
        err => this.error = 'Could not authenticate'
      );
  }
}