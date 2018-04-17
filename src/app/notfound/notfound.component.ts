import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor() { 
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0
    };
    this.myParams = {
      particles: {
        line_linked:{
          color: '009688',
          opacity: 1
        },
        move:{
          speed: 3
        },
        number: {
          value: 80,
        },
        color: {
          value: '004d40'
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
  }

  ngOnInit() {
  }

}
