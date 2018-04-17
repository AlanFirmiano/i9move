import { Component, OnInit } from '@angular/core';
import { ExerciseService } from './exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atividade',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  constructor(private servico: ExerciseService, private rota: Router) {}

  ngOnInit() {
  }

}
