import { Component, OnInit } from '@angular/core';
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
  teste: string[];
  inscricao: Subscription;
  atividades: Report[] = [];
  medias = [];
  todas: Exercise[] = [];
  
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

        this.servico.listaAtividades(this.id).subscribe(
          res => {
            this.atividades = res;
            for(let at of this.atividades) {
              this.servico.mediaAtividades(at.permition.grasp.exercise.id).subscribe(
                resp => {
                  this.medias.push(resp);
                  this.grafico();
                }
              );
            }

          }
        );

        if(this.paciente == null){
          this.router.navigate(['']);
        }
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
    x1.push("Tempo do Paciente");
    for(let i of this.atividades){
      x1.push(i.time);
      xn.push(i.permition.grasp.exercise.title);
    }
    x2=x1;
    vet.push("Tempo do Paciente");
    for(let i of this.atividades){
      vet.push(i.time);
    }

    vet2.push("Tempo Medio");
    for(let x=0;x<this.medias.length;x++){
      vet2.push(this.medias[x]);
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
              return d + "min";
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
              return d + "min";
            }
          }
        }
      }
    });
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
