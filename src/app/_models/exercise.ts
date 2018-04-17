import {Midia} from "./midia";
import {Objects} from "./objects";

export class Exercise {
  id: number;
  title: string;
  description: string;
  midia: Midia = new Midia();
  objects: Objects[];
}
