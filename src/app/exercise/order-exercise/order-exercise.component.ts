import { async } from '@angular/core/testing';
import { Grasp } from './../../_models/grasp';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise} from '../../_models/exercise';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';
import { FileUploader } from 'ng2-file-upload';
import { TestScheduler } from 'rxjs';

@Component({
  selector: 'app-ordenar-atividade',
  templateUrl: './order-exercise.component.html',
  styleUrls: ['./order-exercise.component.css']
})
export class OrderExerciseComponent implements OnInit {
  
  listGrasp1:Grasp[] = [];  
  listGrasp2:Grasp[] = [];  
  listGrasp3:Grasp[] = [];  
  
  constructor(private servico : ExerciseService, private router: Router, private toastService: ToastService) {
    
  }

  ngOnInit() {
    this.listar1();
    this.listar2();
    this.listar3();
  }

  update2(){
    for(let i = 0; i<this.listGrasp1.length; i++){
      this.save(i);
    }
    for(let i = 0; i<this.listGrasp2.length; i++){
      this.save(i);
    }
    for(let i = 0; i<this.listGrasp2.length; i++){
      this.save(i);
    }
  }
  save(grasp){
    this.servico.atualizarGrasp(grasp).subscribe(
      res => console.log(res)
    );
  }
  listar1() {
    this.servico.listarGraspPorNivel(1).subscribe(
      res => this.listGrasp1 = res
    );
  }

  listar2() {
    this.servico.listarGraspPorNivel(2).subscribe(
      res => this.listGrasp2 = res
    );
  }
  
  listar3() {
    this.servico.listarGraspPorNivel(3).subscribe(
      res => this.listGrasp3 = res
    );
  }

  // *** ORDENAR NIVEL 1 ***
  baixo1(grasp:Grasp){
    var index = this.listGrasp1.indexOf(grasp);
    var indexAux = index+1;
    
    var aux = this.listGrasp1[index];
    this.listGrasp1[index] = this.listGrasp1[indexAux];
    this.listGrasp1[indexAux] = aux;
    this.listGrasp1[index].sequence = index+1;
    this.listGrasp1[indexAux].sequence = indexAux+1;
    this.save(this.listGrasp1[index]);
    this.save(this.listGrasp1[indexAux]);
    console.log(this.listGrasp1);
  }
  cima1(grasp: Grasp){
    var index = this.listGrasp1.indexOf(grasp);
    var indexAux = index-1;
    var aux = this.listGrasp1[index];
    this.listGrasp1[index] = this.listGrasp1[indexAux];
    this.listGrasp1[indexAux] = aux;
    this.listGrasp1[index].sequence = index+1;
    this.listGrasp1[indexAux].sequence = indexAux+1
    this.save(this.listGrasp1[index]);
    this.save(this.listGrasp1[indexAux]);
    console.log(this.listGrasp1);
  }

  // *** ORDENAR NIVEL 2 ***
  baixo2(grasp:Grasp){
    var index = this.listGrasp2.indexOf(grasp);
    var indexAux = index+1;
    var aux = this.listGrasp2[index];
    this.listGrasp2[index] = this.listGrasp2[indexAux];
    this.listGrasp2[indexAux] = aux;
    this.listGrasp2[index].sequence = index+1;
    this.listGrasp2[indexAux].sequence = indexAux+1;
    this.save(this.listGrasp2[index]);
    this.save(this.listGrasp2[indexAux]);
  }
  cima2(grasp: Grasp){
    var index = this.listGrasp2.indexOf(grasp);
    var indexAux = index-1;
    var aux = this.listGrasp2[index];
    this.listGrasp2[index] = this.listGrasp2[indexAux];
    this.listGrasp2[indexAux] = aux;
    this.listGrasp2[index].sequence = index+1;
    this.listGrasp2[indexAux].sequence = indexAux+1;
    this.save(this.listGrasp2[index]);
    this.save(this.listGrasp2[indexAux]);
  }

  // *** ORDENAR NIVEL 3 ***
  baixo3(grasp:Grasp){
    var index = this.listGrasp3.indexOf(grasp);
    var indexAux = index+1;
    var aux = this.listGrasp3[index];
    this.listGrasp3[index] = this.listGrasp3[indexAux];
    this.listGrasp3[indexAux] = aux;
    this.listGrasp3[index].sequence = index+1;
    this.listGrasp3[indexAux].sequence = indexAux+1;
    this.save(this.listGrasp3[index]);
    this.save(this.listGrasp3[indexAux]);
  }
  cima3(grasp: Grasp){
    var index = this.listGrasp3.indexOf(grasp);
    var indexAux = index-1;
    var aux = this.listGrasp3[index];
    this.listGrasp3[index] = this.listGrasp3[indexAux];
    this.listGrasp3[indexAux] = aux;
    this.listGrasp3[index].sequence = index+1;
    this.listGrasp3[indexAux].sequence = indexAux+1;
    this.save(this.listGrasp3[index]);
    this.save(this.listGrasp3[indexAux]);
  }

}
