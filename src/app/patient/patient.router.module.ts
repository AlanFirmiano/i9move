import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DetailsPatientComponent } from '../patient/details-patient/details-patient.component';
import { ListPatientComponent } from '../patient/list-patient/lista-paciente.component';
import { NewPatientComponent } from '../patient/new-patient/new-patient.component';
import { GraphicsPatientComponent } from './graphics-patient/graphics-patient.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewUserComponent } from './new-user/new-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const APP_ROUTES: Routes = [
  {path:"", component:ListPatientComponent,
  canActivate :[AuthGuard]},
  {path:"adicionar", component:NewPatientComponent,
  canActivate :[AuthGuard]},
  {path:"adicionarUser", component:NewUserComponent,
  canActivate :[AuthGuard]},
  {path:"user", component:ListUserComponent,
  canActivate :[AuthGuard]},
  {path:"detalhes/:id", component:DetailsPatientComponent,
  canActivate :[AuthGuard]},
  {path:"graficos/:id", component:GraphicsPatientComponent,
  canActivate :[AuthGuard]},
  {path:"editar", component:NewPatientComponent,
  canActivate :[AuthGuard]},
  {path:"editarUser", component:NewUserComponent,
  canActivate :[AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class PatientRoutingModule {

}
