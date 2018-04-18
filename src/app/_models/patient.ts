import { Responsible } from './responsible';

export class Patient {
  id: number;
  registration: string;
  name: string;
  phone: string;
  parent: string;
  phoneParent: string;
  progress: number;
  responsible: Responsible = new Responsible();
  email:string;
  password:string;
}
