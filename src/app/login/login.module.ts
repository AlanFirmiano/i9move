import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { MaterializeModule } from 'angular2-materialize';
import { ToastService } from '../toast.service';
import { UsuarioRoutingModule } from './usuario.router.module';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    UsuarioRoutingModule,
    ParticlesModule
  ],
  providers: [
    LoginService, ToastService
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
