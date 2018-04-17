import {Permition} from "./permition";

export class Report {
  id: number;
  permition: Permition = new Permition();
  status: string;
  time: number;
  effortLevel: number;
  date: Date;
  message: string;
  sets: number;
  repetitions: number;
}
