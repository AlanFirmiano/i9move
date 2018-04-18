import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';

const APP_ROUTES: Routes = [
  {path: 'paciente', loadChildren: 'app/patient/patient.module#PatientModule'},
  {path: 'atividade', loadChildren: 'app/exercise/exercise.module#ExerciseModule'},
  {path: 'permissoes', loadChildren: 'app/permition/permition.module#PermitionModule'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'paciente', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
