import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Exercise } from "../../_models/exercise";
import { ExerciseService } from "../../exercise/exercise.service";
import { ToastService } from "../../toast.service";
import {Objects} from "../../_models/objects";
import {Midia} from "../../_models/midia";
import {Level} from "../../_models/level";
import {Recommendation} from "../../_models/recommendation";
import {Serie} from "../../_models/serie";
import {Grasp} from "../../_models/grasp";
@Component({
  selector: 'app-nova-atividade',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {
  private atividade: Exercise = new Exercise();
  private auxAtv: Exercise = new Exercise();
  private objeto: Objects = new Objects();
  private grasp: Grasp = new Grasp();
  private grasp2: Grasp = new Grasp();
  private grasp3: Grasp = new Grasp();
  private level: Level = new Level();
  private recommendation: Recommendation = new Recommendation();
  private serie: Serie = new Serie();
  private dica: string;
  private midia: Midia = new Midia();
  listObjetos: Objects[] = [];
  listSerie1: Serie[] = [];
  listSerie2: Serie[] = [];
  listSerie3: Serie[] = [];
  private rec1: Recommendation = new Recommendation();
  private rec2: Recommendation = new Recommendation();
  private rec3: Recommendation = new Recommendation();
  private aux = false;

  
  constructor(private servico: ExerciseService, private toastService: ToastService, private router: Router) { }

  remNivel1(serie: Serie) {
    var index = this.listSerie1.indexOf(serie, 0);
    if (index > -1) {
      this.listSerie1.splice(index, 1);
    }
  }
  addNivel1(serie: Serie){
    this.listSerie1.push(serie);
    this.serie = new Serie();
  }


  remNivel2(serie: Serie) {
    var index = this.listSerie2.indexOf(serie, 0);
    if (index > -1) {
      this.listSerie2.splice(index, 1);
    }
  }
  addNivel2(serie: Serie){
    this.listSerie2.push(serie);
    this.serie = new Serie();
  }

  remNivel3(serie: Serie) {
    var index = this.listSerie3.indexOf(serie, 0);
    if (index > -1) {
      this.listSerie3.splice(index, 1);
    }
  }
  addNivel3(serie: Serie){
    this.listSerie3.push(serie);
    this.serie = new Serie();
  }

  removerObject(objects: Objects) {
    var index = this.listObjetos.indexOf(objects, 0);
    if (index > -1) {
      this.listObjetos.splice(index, 1);
    }
  }
  adicionarObject(object: Objects){
    console.log("adicionar objeto : "+object.name);
    this.listObjetos.push(object);
    this.objeto = new Objects();

  }

  save(){
    if (!this.aux){
        this.atividade.objects = this.listObjetos;
        this.servico.salvarAtividade(this.atividade).subscribe(
          res => {
            this.toastService.toast(res, "green");
            if (this.listSerie1.length > 0) {
              this.rec1.serie = this.listSerie1;
              this.grasp.recommendation = this.rec1;
              this.grasp.exercise = this.atividade;
              this.grasp.tip = this.dica;
              this.grasp.update = new Date();
              this.grasp.level.level = 1;
              this.servico.salvarGrasp(this.grasp).subscribe(
                resp => this.toastService.toast("Nivel 1","green"),

                err => this.toastService.toast(err,"red")
              );
            }
            if (this.listSerie2.length > 0) {
              this.rec2.serie = this.listSerie2;
              this.grasp2.exercise = this.atividade;
              this.grasp2.tip = this.dica;
              this.grasp2.update = new Date();
              this.grasp2.level.level = 2;
              this.grasp2.recommendation = this.rec2;
              this.servico.salvarGrasp(this.grasp2).subscribe(
                resp => this.toastService.toast("Nivel 2","green"),

                err => this.toastService.toast(err,"red")
              );
            }
            if (this.listSerie3.length > 0) {
              this.rec3.serie = this.listSerie3;
              this.grasp3.exercise = this.atividade;
              this.grasp3.tip = this.dica;
              this.grasp3.update = new Date();
              this.grasp3.level.level = 3;
              this.grasp3.recommendation = this.rec3;
              this.servico.salvarGrasp(this.grasp3).subscribe(
                resp => this.toastService.toast("Nivel 3","green"),

                err => this.toastService.toast(err,"red")
              );
            }
            
            
            this.router.navigateByUrl('atividade');

          },
          err => {
            this.toastService.toast(err,"red");
            console.log("ERROO"+err);
          }
        );




  }else{
    this.servico.editarAtividade(this.atividade).subscribe(
      res => {
        this.toastService.toast(res, 'green');
      },
      err => {
        this.toastService.toast(err, 'red');
      }
    );
  }

  }

  ngOnInit() {
    if (this.servico.atividade != null) {
       this.atividade = this.servico.atividade;
       this.aux = true;
    }else
      this.atividade = new Exercise();
  }

}
