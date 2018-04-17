import { Component, DoCheck } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Acompanhamento de Pacientes';
  lista = [];

  mostrarMenu:boolean = false;
  constructor(private service: AppService, private router:Router, private login:LoginService){}

  ngDoCheck(){
    this.mostrarMenu = localStorage.getItem('token')? true : false; 
  }

  deslogar(){
    this.service.deslogar();
  }
}
