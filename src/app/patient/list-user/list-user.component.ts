import { Component, OnInit, DoCheck } from '@angular/core';
import { ToastService } from '../../toast.service';
import { Router } from "@angular/router";

import { PatientService } from '../patient.service';
import { Responsible } from '../../_models/responsible';

@Component({
  selector: 'app-lista-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listaResponsible: Responsible[] = [];

  constructor(private servico: PatientService, private toastService: ToastService, private router: Router) {

  }

  listar(){
    this.servico.listaResponsible().subscribe(
      res => this.listaResponsible = res
    );
  }

  remover(responsible: Responsible){
    this.servico.removerResponsible(responsible).subscribe(
      res => {
        this.toastService.toast(res,"green");
        this.listar();
      },
      err => this.toastService.toast(err,"red")
    );
  }

  editar(responsible: Responsible){
    this.servico.responsible = responsible;
    this.router.navigate(['paciente/editarUser']);
  }


  ngOnInit(){
    this.listar();
  }

}
