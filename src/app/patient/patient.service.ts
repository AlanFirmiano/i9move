import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from '../_models/patient';
import { Report } from '../_models/report';
import { Permition } from '../_models/permition';
import { Responsible } from '../_models/responsible';
@Injectable()
export class PatientService {

  public paciente: Patient = null;
  public responsible: Responsible = null;

  private url:string = localStorage.getItem('url') + '/patients';
  private res:string = localStorage.getItem('url') + '/responsible';

  private options:RequestOptions;
  constructor(private http: Http) {
    let token = localStorage.getItem("token");
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', token);
      this.options = new RequestOptions({ headers: header });
  }

  public salvarPaciente(paciente: Patient): Observable<string>{
    return this.http.post(this.url, paciente,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public salvarResponsible(responsible: Responsible): Observable<string>{
    return this.http.post(this.res, responsible,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public editarPaciente(paciente: Patient): Observable<string>{
    return this.http.put(this.url, paciente,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public editarResponsible(responsible: Responsible): Observable<string>{
    return this.http.put(this.res, responsible,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public removerPaciente(paciente: Patient): Observable<string>{
    return this.http.delete(this.url + '/' + paciente.id,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public removerResponsible(responsible: Responsible): Observable<string>{
    return this.http.delete(this.res + '/' + responsible.id,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public detalhesPaciente(id: number): Observable<any>{
    return this.http.get(this.url + '/' + id,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }

  public atividades (): Observable<any> {
    return this.http.get(localStorage.getItem('url') + '/exercises',this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaAtividades (id: number): Observable<Report[]> {
    return this.http.get(localStorage.getItem('url') + '/report/byPatient/' + id,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaReport (): Observable<Report[]> {
    return this.http.get(localStorage.getItem('url') + '/report',this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaPermitionsTrue (id: number): Observable<Permition[]> {
    return this.http.get(localStorage.getItem('url') + '/permitions/unlocked/' + id,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaPermitionsFalse (id: number): Observable<Permition[]> {
    return this.http.get(localStorage.getItem('url') + '/permitions/locked/' + id,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }

  public setLocked(permition:Permition): Observable<string>{
    
    return this.http.put(localStorage.getItem('url') + '/permitions',permition,this.options).map(
      (res) => res.text()
      ,
      function(err){

      }
    );
  }
  public mediaAtividades (id: number): Observable<number> {
    return this.http.get(localStorage.getItem('url') + '/report/byExercise/' + id,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }

  public listaPaciente(): Observable<Patient[]>{
    return this.http.get(this.url,this.options).map(
      (res) => res.json()
      ,
      function(err){}
    );
  }

  public listaResponsible(): Observable<Patient[]>{
    return this.http.get(this.res,this.options).map(
      (res) => res.json()
      ,
      function(err){}
    );
  }
}
