import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {NewPermitionComponent} from './new-permition/new-permition.component';
import { AuthGuard } from '../guards/auth.guard';

const APP_ROUTES: Routes = [
  {path: '', component: NewPermitionComponent,
  canActivate :[AuthGuard]},
  {path: 'permissoes/editar', component: NewPermitionComponent,
  canActivate :[AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class PermitionRouterModule {}
