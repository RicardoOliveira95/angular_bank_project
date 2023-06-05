import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mov } from './mov';

@Injectable({
  providedIn: 'root'
})
export class MovService {
  constructor(private http: HttpClient) { }

  getMovs() {
    return this.http.get<Mov[]>('/api/movs');
  }

  getMov(id: number) {
    return this.http.get<Mov>(`/api/movs/${id}`);
  }
}
