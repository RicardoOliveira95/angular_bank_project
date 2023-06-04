import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deposit } from './deposit';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private http: HttpClient) { }

  deposit(quantia: number) {
    return this.http.post<{quantia: number}>('/api/deposit',{quantia: quantia})
    .pipe(
        map(result => {
          console.log(quantia)
          return true;
        })
      );
  }
}