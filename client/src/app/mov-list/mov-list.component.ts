import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mov } from '../mov';
import { MovService } from '../mov.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './mov-list.component.html',
  styleUrls: ['./mov-list.component.css']
})
export class MovListComponent implements OnInit {
  mov$: Observable<Mov[]>;

  constructor(private movs: MovService) { }

  ngOnInit() {
    this.mov$ = this.movs.getMovs();
  }
}