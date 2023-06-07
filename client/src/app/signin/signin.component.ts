import { Component, OnInit } from '@angular/core';
import { SigninService } from '../signin.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit{
  public username: string;
  public password: string;
  public error: string;
  user$: Observable<User[]>;

  constructor(private auth: AuthService,private sign: SigninService, private users: UserService,private router: Router) { }
    
  public submit1() {
    //this.sign.signin(this.username,this.password)
    this.auth.login(this.username, this.password, false)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['todos']),
        err => this.error = 'Could not authenticate'
      );
  }

  ngOnInit(): void {
    
  }
}
