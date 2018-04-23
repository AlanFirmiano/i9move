import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Responsible } from '../../_models/responsible';
import { PatientService } from '../../patient/patient.service';
import { ToastService } from '../../toast.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-novo-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  listaResponsible: Responsible[] = [];
  private responsible: Responsible;
  private aux = false;

  constructor(private servico: PatientService, private toastService: ToastService, private router: Router) {}
  
  ngOnInit() {
    if(this.servico.responsible != null) {
       this.responsible = this.servico.responsible;
       this.aux = true;
       }else {
      this.responsible = new Responsible();
    }
  }

  save(){
    if(!this.aux){
      this.servico.salvarResponsible(this.responsible).subscribe(
        res => {
          this.toastService.toast(res,"green");
          this.router.navigateByUrl('paciente/user');
        },

        err => this.toastService.toast(err,"red")
      );
    }else{
      this.servico.editarResponsible(this.responsible).subscribe(
        res => {
          this.toastService.toast(res,"green");
          this.router.navigateByUrl('paciente/user');
        },
        err => this.toastService.toast(err,"red")
      );
    }
  }



}
