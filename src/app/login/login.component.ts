import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Responsible } from '../_models/responsible';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor(private servico: LoginService, private rota: Router, private render: Renderer2) { }

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };
    this.myParams = {
      particles: {
        move:{
          speed: 3
        },
        number: {
          value: 70,
        },
        color: {
          value: 'ffffff'
        },
        shape: {
          type: 'circle',
        },
      },interactivity:{
        events:{
          modes:{
            repulse:{
              distance: 10
            }
          },
          onhover:{
            enable: false
          },
          onclick:{
            enable: true,
            mode: 'repulse'
          }
        }
      }
    };

    this.render.addClass(document.body, 'fundo');
  }
  private usuario: Responsible = new Responsible();
  logar() {
    this.servico.logar(this.usuario).subscribe(
      res => {
        this.render.removeClass(document.body, 'fundo');
        this.rota.navigate(["paciente"]);
      },
      err => {

      }
    )

  }
}
