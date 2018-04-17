import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/routers';
import { MaterializeModule } from 'angular2-materialize';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

import { ParticlesModule } from 'angular-particle';
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    AppRoutingModule,
    MaterializeModule,
    ParticlesModule
  ],
  providers: [AppService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
