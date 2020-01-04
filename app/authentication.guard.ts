import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Injectable( {
    providedIn: 'root'
} )
export class AuthenticationGuard implements CanActivate {

    constructor(
        private authSvc: AuthService,
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.authSvc.checkToken();
    }

}
