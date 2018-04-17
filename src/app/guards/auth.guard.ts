import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { LoginService } from "../login/login.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if(localStorage.getItem('token')){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
    
}