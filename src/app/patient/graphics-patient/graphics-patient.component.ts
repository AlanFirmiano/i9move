import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import * as c3 from 'c3';

import { PatientService } from '../patient.service';
import { Patient } from '../../_models/patient';
import { Exercise } from '../../_models/exercise';
import { Report } from '../../_models/report';
import * as d3 from 'd3';
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'app-graficos-paciente',
  templateUrl: './graphics-patient.component.html',
  styleUrls: ['./graphics-patient.component.css']
})
export class GraphicsPatientComponent implements OnInit {

  id: number;
  paciente: Patient = new Patient();
  inscricao: Subscription;
  atividades: Report[] = [];
  medias = [];
  reports: Report[] = [];
  e1 = 0;
  e2 = 0;
  e3 = 0;
  e4 = 0;
  e5 = 0;

  ngOnInit() {
    
    this.inscricao = this.route.params.subscribe((params:any) => {
        this.id = params['id'];
        this.servico.detalhesPaciente(this.id).subscribe(
          res => this.paciente = res
        );
        if(this.paciente == null){
          this.router.navigate(['']);
        }
        this.servico.listaReport().subscribe(
          res => this.reports = res
        );
        this.servico.listaAtividades(this.id).subscribe(
          res => {
            this.atividades = res;
            this.medias = [];
            //REPORT POR PESSOA = ATIVIDADES
            for(let at of this.atividades) {
              let somador = 0;
              let qtd = 0;
              for(let y of this.reports){
                if(at.permition.grasp.exercise.id == y.permition.grasp.exercise.id){
                  somador = somador + y.time;
                  qtd = qtd + 1;
                }
              }
              this.medias.push((somador/qtd));
              this.grafico();   
              /*this.servico.mediaAtividades(at.permition.grasp.exercise.id).subscribe(
                resp => {
                  console.log(resp);
                  this.medias.push(resp);
                  this.grafico();                  
                },err=>{
                  console.log(err);
                }
              );*/
              
            }
          },err =>{
            console.log(err);
          }
        );
      }
      
    );
    
  }

  grafico(){
    let nomes = [];
    let vet = [];
    let vet2 = [];
    let dor = [0];

    let x1 = [];
    let x2 = [];
    let xn = [];

    vet2.push("Tempo Medio");
    for(let x=0;x<this.medias.length;x++){
      vet2.push(this.medias[x]);
    }
        
    vet.push("Tempo do Paciente");
    for(let i of this.atividades){
      vet.push(i.time);
    }
    x1.push("Tempo do Paciente");
    for(let i of this.atividades){
      x1.push(i.time);
      xn.push(i.permition.grasp.exercise.title);
    }
    x2.push("Tempo do Paciente");
    for(let i of this.atividades){
      x2.push(i.time);
    }
    for(let i of this.atividades){
      nomes.push(i.permition.grasp.exercise.title);
    }

    for(let i of this.atividades){
      if(i.effortLevel==1){
        this.e1++;
      }else if(i.effortLevel==2){
        this.e2++;
      }else if(i.effortLevel==3){
        this.e3++;
      }else if(i.effortLevel==4){
        this.e4++;
      }else if(i.effortLevel==5){
        this.e5++;
      }
    }
    let chart = c3.generate({

      bindto: '#chart',

      data: {
        x: 'x',
        columns: [
          ['x'].concat(nomes),
          vet,
          vet2

        ],
        type: 'bar'

      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'category',
          height: 40
        },
        y: {
          tick: {
            format: function (d) {
              return d + "seg";
            }
          }
        }
      }
    });
      let chart2 = c3.generate({

        bindto: '#chart2',

        data: {
          columns: [
            ['1 - ' + (this.e1 / this.atividades.length), this.e1],
            ['2 - ' + (this.e2 / this.atividades.length), this.e2],
            ['3 - ' + (this.e3 / this.atividades.length), this.e3],
            ['4 - ' + (this.e4 / this.atividades.length), this.e4],
            ['5 - ' + (this.e5 / this.atividades.length), this.e5]
          ],
          type: 'line'
        },
        donut: {
          title: "Esforço"
        },
        legend:{
          position:'right'
        }
    });
    setTimeout(function () {
      chart2.transform('pie');
    }, 1000);

    setTimeout(function () {
      chart2.transform('donut');
    }, 2000);
    let chart3 = c3.generate({

      bindto: '#chart3',

      data: {
        x: 'x',
        columns: [
          ['x'].concat(xn),
          x1,
          x2
        ],
        types:{
          x1:'bar',
          x2:'spline'
        }
      },
      transition: {
        duration: 500
      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'category',
          height: 40
        },
        y: {
          tick: {
            format: function (d) {
              return d + "seg";
            }
          }
        }
      }
    });
    setTimeout(function () {
      chart3.transform('spline');
    }, 1000);
  }

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servico: PatientService) {
      
    }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
