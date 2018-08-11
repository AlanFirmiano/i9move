import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Exercise } from '../_models/exercise';
import {Grasp} from "../_models/grasp";

@Injectable()
export class ExerciseService {
  public atividade: Exercise = null;
  
  private url = localStorage.getItem('url') + '/exercises';
  private urlGrasp = localStorage.getItem('url') + '/grasp';

  private options:RequestOptions;

  constructor(private http: Http) {
    let token = localStorage.getItem("token");
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', token);
      this.options = new RequestOptions({ headers: header });
  }

public salvarAtividade(atividade: Exercise): Observable<string> {
  return this.http.post(this.url, atividade,this.options).map(
    (res) => res.text()
    ,
    (err) => err.text()
  );
}

public editarAtividade(atividade: Exercise): Observable<string> {
  return this.http.put(this.url, atividade,this.options).map(
    (res) => res.text()
    ,
    (err) => err.text()
  );
}
public removerAtividade(atividade: Exercise): Observable<string> {
  return this.http.delete(this.url+'/'+atividade.id,this.options).map(
    (res) => res.text()
    ,
    (err) => err.text()
  );
}
  public getAtividade (atividade: Exercise): Observable<any> {
    return this.http.get(this.url+'/'+atividade.title,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }

  public listaAtividade (): Observable<any> {
    return this.http.get(this.url,this.options).map(
      (res) => res.json()
      ,
      (err) => err.text()
    );
  }
  public salvarGrasp(grasp: Grasp): Observable<string> {
    return this.http.post(this.urlGrasp, grasp,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }

  public atualizarGrasp(grasp: Grasp): Observable<string> {
    return this.http.put(this.urlGrasp, grasp,this.options).map(
      (res) => res.text(),
      (err) => err.text()
    );
  }

  public listarGrasp (): Observable<any> {
    return this.http.get(this.urlGrasp,this.options).map(
      (res) => res.json()
      ,
      (err) => err.text()
    );
  }


  public listarGraspPorNivel (level:number): Observable<any> {
    return this.http.get(this.urlGrasp+"/level/"+level,this.options).map(
      (res) => res.json()
      ,
      (err) => err.text()
    );
  }
}
