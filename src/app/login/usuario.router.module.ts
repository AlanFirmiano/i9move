import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ListExerciseComponent } from '../exercise/list-exercise/list-exercise.component';
import { NewExerciseComponent } from '../exercise/new-exercise/new-exercise.component';
import { LoginComponent } from './login.component';

const APP_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  //{path: 'usuario/adicionar', component: NewExerciseComponent},
  //{path: 'atividade/editar', component: NewExerciseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {

}
