import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Patient } from '../../_models/patient';
import { PatientService } from '../../patient/patient.service';
import { ToastService } from '../../toast.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-novo-paciente',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {
  listaPaciente: Patient[] = [];
  private paciente: Patient;
  private aux = false;

  constructor(private servico: PatientService, private toastService: ToastService, private router: Router) {}
  
  ngOnInit() {
    if(this.servico.paciente != null) {
       this.paciente = this.servico.paciente;
       this.aux = true;
       }else {
      this.paciente = new Patient();
    }
  }

  save(){
    if(!this.aux){
      this.paciente.registration = '';
      this.paciente.level = 1;
      this.servico.salvarPaciente(this.paciente).subscribe(
        res => {
          this.toastService.toast(res,"green");
          this.router.navigateByUrl('paciente');
        },

        err => this.toastService.toast(err,"red")
      );
    }else{
      this.servico.editarPaciente(this.paciente).subscribe(
        res => {
          this.toastService.toast(res,"green");
          this.router.navigateByUrl('paciente');
        },
        err => this.toastService.toast(err,"red")
      );
    }
  }



}
