import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PermitionService} from './permition.service';

@Component({
  selector: 'app-permition',
  templateUrl: './permition.component.html',
  styleUrls: ['./permition.component.css']
})
export class PermitionComponent implements OnInit {

  constructor(private servico: PermitionService, private rota: Router) { }

  ngOnInit() {
  }

}
