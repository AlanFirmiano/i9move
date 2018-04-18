import { Component, OnInit, DoCheck } from '@angular/core';
import { ToastService } from '../../toast.service';
import { Router } from "@angular/router";

import { PatientService } from '../patient.service';
import { Patient } from '../../_models/patient';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.css']
})
export class ListPatientComponent implements OnInit {

  listaPaciente: Patient[] = [];

  constructor(private servico: PatientService, private toastService: ToastService, private router: Router) {

  }

  listar(){
    this.servico.listaPaciente().subscribe(
      res => this.listaPaciente = res
    );
  }

  remover(paciente: Patient){
    this.servico.removerPaciente(paciente).subscribe(
      res => {
        this.toastService.toast(res,"green");
        this.listar();
      },
      err => this.toastService.toast(err,"red")
    );
  }

  editar(paciente: Patient){
    this.servico.paciente = paciente;
    this.router.navigate(['paciente/editar']);
  }


  ngOnInit(){
    this.listar();
  }

}
