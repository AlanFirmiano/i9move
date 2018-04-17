import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private servico:PatientService, private rota:Router) {}

  ngOnInit() {
  }

}
