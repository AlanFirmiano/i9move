import {Grasp} from "./grasp";
import {Patient} from "./patient";

export class Permition{
  id: number;
  locked: boolean;
  grasp: Grasp = new Grasp();
  patient: Patient = new Patient();
}
