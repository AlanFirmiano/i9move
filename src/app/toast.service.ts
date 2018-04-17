import { Injectable } from '@angular/core';
declare var Materialize:any;
@Injectable()
export class ToastService {

  constructor() { }

  toast(text: string, style: string = ""){
    Materialize.toast(text, 3000, style);
  }
}
