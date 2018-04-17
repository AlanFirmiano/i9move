import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Permition } from '../_models/permition';

@Injectable()
export class PermitionService {
  public permition: Permition = null;
  private url = localStorage.getItem('url') + '/permitions';

  private options:RequestOptions;
  constructor(private http: Http) {
    let token = localStorage.getItem("token");
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', token);
      this.options = new RequestOptions({ headers: header });
  }

  public salvarPermissao(permissao: Permition): Observable<string> {
    return this.http.post(this.url, permissao,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );

  }
  public editarPermition(permissao: Permition): Observable<string> {
    return this.http.put(this.url, permissao,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }
  public removerPermition(permissao: Permition): Observable<string> {
    return this.http.delete(this.url+'/'+permissao.id,this.options).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }

  public listaPermition (): Observable<any> {
    return this.http.get(this.url,this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaPatients (): Observable<any> {
    return this.http.get(localStorage.getItem('url') + '/patients',this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }
  public listaGrasp (): Observable<any> {
    return this.http.get(localStorage.getItem('url') + '/grasp',this.options).map(
      (res) => res.json()
      ,
      function(err){

      }
    );
  }

}
