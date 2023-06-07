import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(public http: HttpClient, private userService : UserService) { }
  
  signin(username: string, password: string, flag: boolean) {
    
    return this.http.post('/api/auth',{username: username, password: password});
  }
}
