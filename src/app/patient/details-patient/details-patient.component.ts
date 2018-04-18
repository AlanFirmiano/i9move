import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { PatientService } from '../patient.service';
import { Patient } from '../../_models/patient';
import { Report } from '../../_models/report';
import { Permition } from '../../_models/permition';
import { ToastService } from '../../toast.service';
@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.css']
})
export class DetailsPatientComponent implements OnInit {

  id:number;
  paciente:Patient = new Patient();
  teste:string[];
  inscricao:Subscription;
  atividades:Report[] = [];
  fullImagePath : string;
  permitionsTrue:Permition[] = [];
  permitionsFalse:Permition[] = [];
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private toastService: ToastService,
    private servico :PatientService) {
      this.fullImagePath = '/assets/images/teste.png';
    }


  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params:any) => {
        this.id = params['id'];
        this.servico.detalhesPaciente(this.id).subscribe(
          res => this.paciente = res
        );
        this.servico.listaAtividades(this.id).subscribe(
          res => this.atividades = res
        );
        
        this.servico.listaPermitionsTrue(this.id).subscribe(
          res => {
            this.permitionsTrue = res;
          }
        );
        this.servico.listaPermitionsFalse(this.id).subscribe(
          res => {
            this.permitionsFalse = res;
          }
        );
        if(this.paciente == null){
          this.router.navigate(['']);
        }
      }
    );
  }

  switchUnlocked(permition:Permition){
    if(permition.locked === true){
      permition.locked = false;
    }else{
      permition.locked = true;
    }
    this.servico.setLocked(permition).subscribe(
      res=>{
        this.permitionsTrue = [];
        this.permitionsFalse = [];
        this.toastService.toast(res,"green");
        this.servico.listaPermitionsTrue(this.id).subscribe(
          res => {
            this.permitionsTrue = res;
          }
        );
        this.servico.listaPermitionsFalse(this.id).subscribe(
          res => {
            this.permitionsFalse = res;
          }
        );
      },
      err =>{
        this.toastService.toast(err,"red");
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
