import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ListExerciseComponent } from '../exercise/list-exercise/list-exercise.component';
import { NewExerciseComponent } from '../exercise/new-exercise/new-exercise.component';
import { AuthGuard } from '../guards/auth.guard';

const APP_ROUTES: Routes = [
  {path: '', component: ListExerciseComponent,  canActivate :[AuthGuard]},
  {path: 'adicionar', component: NewExerciseComponent,  canActivate :[AuthGuard]},
  {path: 'editar', component: NewExerciseComponent,  canActivate :[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule {

}
