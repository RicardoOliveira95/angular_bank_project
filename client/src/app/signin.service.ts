import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(public http: HttpClient, private userService : UserService) { }
  /*sign(username: string, password: string){
    console.log("POST")
    return this.http.post('/api/subscribe',{username: username, password: password});
  }
  sign(username: string, password: string){
    console.log("POST")
    return this.http.post('api/subscribe',{username: username, password: password}).pipe(
        map(result => {
          
          return true;
        }));
  }*/
  signin(username: string, password: string, flag: boolean) {
    
    console.log("POST")
    return this.http.post('/api/auth',{username: username, password: password});
  }
}