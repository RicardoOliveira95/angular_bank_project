import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deposit } from './deposit';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(private http: HttpClient) { }

  deposit(quantia: number) {
    return this.http.post<{quantia: number}>('/api/transfer',{quantia: quantia})
    .pipe(
        map(result => {
          console.log(quantia)
          return true;
        })
      );
  }
}