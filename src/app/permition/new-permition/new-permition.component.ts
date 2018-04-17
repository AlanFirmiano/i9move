import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Patient } from '../../_models/patient';
import { ToastService } from '../../toast.service';
import { PermitionService } from "../permition.service";
import { Permition } from "../../_models/permition";
import { Exercise } from "../../_models/exercise";
import { Grasp } from "../../_models/grasp";
import { Level } from "../../_models/level";

@Component({
  selector: 'app-nova-permissao',
  templateUrl: './new-permition.component.html',
  styleUrls: ['./new-permition.component.css']
})
export class NewPermitionComponent implements OnInit {
  listaPaciente: Patient[] = [];
  listaGrasp: Grasp[] = [];
  listPermition: Permition[] = [];
  nomePessoa: number;
  private permition: Permition;
  private aux = false;

  constructor(private servico: PermitionService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    if (this.servico.permition != null) {
      this.permition = this.servico.permition;
      this.aux = true;
    } else {
      this.permition = new Permition();

    }

    this.listarPatients();
    this.listarGrasps();

  }
  addPermition(item: Grasp) {
    let existe: boolean = false;

    this.permition.locked = true;
   
    for (let per of this.listPermition)
      if (per.grasp.exercise == item.exercise)
        existe = true;
    if (!existe) {
      this.permition.grasp = item;
      this.listPermition.push(this.permition);
    } else {
      this.toastService.toast("Exercicio já adicionado!", "red");
    }
    existe = false;
    this.permition = new Permition();

  }

  remPermition(permition: Permition) {
    var index = this.listPermition.indexOf(permition, 0);
    if (index > -1) {
      this.listPermition.splice(index, 1);
    }
  }

  addPermitions(nivel: number) {
    let existe: boolean = false;

    //VERIFICAR NIVEL
    for (let per of this.listaGrasp) {
      if (nivel == per.level.level) {
        //VERIFICAR EXERCICIO REPETIDO
        for (let idPer of this.listPermition)
          if (idPer.grasp.level.level == per.level.level && idPer.grasp.exercise == per.exercise)
            existe = true;
        if (!existe) {
          this.permition.grasp = per;
          this.listPermition.push(this.permition);
        } else {
          this.toastService.toast("Exercicio " + per.exercise.title + " já adicionado!", "red");
        }
        this.permition = new Permition();
      }
    }
    this.permition = new Permition();
    console.log(this.listPermition);

  }

  listarPatients() {
    this.servico.listaPatients().subscribe(
      res => this.listaPaciente = res
    );
  }
  listarGrasps() {
    this.servico.listaGrasp().subscribe(
      res => {
        this.listaGrasp = res;
      }
    );
  }

  save() {
    if (this.nomePessoa) {
      console.log("entrou");
      let pessoa;
      for (let p2 of this.listaPaciente)
        if (p2.id == this.nomePessoa)
          pessoa = p2;
      if (!this.aux) {
        for(let p of this.listPermition){
          p.locked = true;
          p.patient = pessoa;
          this.servico.salvarPermissao(p).subscribe(
          res => this.toastService.toast(res, "green"),

          err => this.toastService.toast(err, "red")
        );
        }
      } else {
        this.servico.editarPermition(this.permition).subscribe(
          res => {
            this.toastService.toast(res, "green");
          },
          err => this.toastService.toast(err, "red")
        );
      }
    } else {
      this.toastService.toast("Selecione um Paciente", "red");
    }

  }
}