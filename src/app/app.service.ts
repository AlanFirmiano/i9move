import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: Http) {
    localStorage.setItem('url','http://i9move.quixada.ufc.br/api');
    //localStorage.setItem('url','http://localhost:8080');
  }
  
  public deslogar(){
    localStorage.removeItem('token');
  }
}
