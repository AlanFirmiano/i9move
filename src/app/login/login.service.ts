import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Responsible } from '../_models/responsible';

@Injectable()
export class LoginService {
  private url = localStorage.getItem('url') + '/responsible';

  logado:boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: Http) { }
  private options:RequestOptions;

  public logar(usuario:Responsible) : Observable<string>{
    return this.http.post(localStorage.getItem('url') + '/login', usuario)
    .map(res => {
      localStorage.setItem('token', res.text());
      let token = localStorage.getItem("token");
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', token);
      this.options = new RequestOptions({ headers: header });
      this.logado = true;
      this.mostrarMenuEmitter.emit(true);
      return "sucesso";
    },
    err=>{
      this.logado = false;
      this.mostrarMenuEmitter.emit(false);
    });
  }

  usuarioEstaAutenticado(){
    return this.logado;
  }

  public salvar(usuario: Responsible) : Observable<string>{
    return this.http.post('http://localhost:8080/users/',usuario).map(
      (res) => res.text()
      ,
      (err) => err.text()
    )
  }

  public remover(usuario: Responsible) : Observable<string>{
    return this.http.delete('http://localhost:8080/users/'+usuario.id).map(
      (res) => res.text()
      ,
      (err) => err.text()
    );
  }

    public listar () : Observable<any>{
      return this.http.get('http://localhost:8080/users').map(
        (res) => res.json()
        ,
        function(err){

        }
      );
    }
}
