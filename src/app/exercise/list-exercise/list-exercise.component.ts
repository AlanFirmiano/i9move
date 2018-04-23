import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise} from '../../_models/exercise';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-lista-atividade',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.css']
})
export class ListExerciseComponent implements OnInit {
  listExercise: Exercise[] = [];
  fullImagePath: string;

  exercise:Exercise;
  public uploader : FileUploader = new FileUploader(
  {url: "http://i9move.quixada.ufc.br:80/exercises/upload",
  
  itemAlias:'file' ,
  autoUpload:false
  });
  private file:File;
    
  constructor(private servico : ExerciseService, private router: Router, private toastService: ToastService) {
    this.listar();
    this.fullImagePath = '/assets/images/teste.png';
      
    }

  modalActions = new EventEmitter<string|MaterializeAction>();

  limpar(event){
    this.uploader.cancelAll();
  }
  openModal(atividade:Exercise) {
    this.exercise = atividade;
    this.uploader = new FileUploader(
      {url: "http://i9move.quixada.ufc.br/api/exercises/"+this.exercise.id+"/upload",
      
      itemAlias:'file' 
      });
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  fileChange(event){
    this.file = event.target.files[0];
  }

  up(){
    this.uploader.authToken=localStorage.getItem('token');
    this.uploader.uploadItem(this.uploader.queue[this.uploader.queue.length - 1]);
    this.toastService.toast("Upload feito com Sucesso!","green");
    this.listar();
  }
  
  

  listar() {
    this.servico.listaAtividade().subscribe(
      res => this.listExercise = res
    );
  }
  remover(atividade: Exercise){
    this.servico.removerAtividade(atividade).subscribe(
      res => {
        this.toastService.toast(res,"green");
        this.listar();
      },
      err => this.toastService.toast(err,"red")
  );

  }

  editar(atividade: Exercise){
    this.servico.atividade = atividade;
    this.router.navigate(['atividade/editar']);
  }
  
  ngOnInit() {
  }
}
