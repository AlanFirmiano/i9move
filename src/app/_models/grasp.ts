import {Exercise} from './exercise';
import {Level} from './level';
import {Midia} from './midia';
import {Recommendation} from './recommendation';
export class Grasp {
  id: number;
  exercise: Exercise = new Exercise();
  level: Level = new Level();
  tip: string;
  update: Date;
  recommendation: Recommendation = new Recommendation();
  sequence: number;

}
