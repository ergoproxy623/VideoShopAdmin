import { EventEmitter, Injectable } from '@angular/core';

import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { TokenService } from '../services/token.service';
import { Admin } from '../models/admin';
import { Auth } from '../models/auth';
import { Email } from '../models/email';
import { ResetPass } from '../models/reset-pass';
import { UpdPass } from '../models/upd-pass';
import { Router } from '@angular/router';

@Injectable( {
    providedIn: 'root'
} )
export class AuthService {

    constructor(
        private apiSvc: ApiService,
        private tokenSvc: TokenService,
        private router: Router,
    ) {
    }

    isAuth$: EventEmitter<boolean> = new EventEmitter<boolean>();

    auth( admin: Admin, isSessionOnly: boolean ): Observable<Auth> {
        if ( this.tokenSvc.getToken( isSessionOnly ) === null ) {
            return this.apiSvc.auth( admin ).pipe(
                map( ( res: any ) => {
                    this.tokenSvc.setToken( res.data.token, isSessionOnly );

                    return {
                        access: true,
                        error: '',
                    };
                } ),
                catchError( ( err: any ) => {
                    return throwError( {
                        access: false,
                        error: err.error.error
                    } );
                } )
            );
        } else {
            return from( [ {
                access: true,
                error: '',
            } ] );
        }
    }

    resetPass( email: Email ): Observable<ResetPass> {
        return this.apiSvc.resetPass( email ).pipe(
            map( ( res: any ) => {
                return {
                    success: true,
                    error: '',
                };
            } ),
            catchError( ( err: any ) => {
                return throwError( {
                    success: false,
                    error: err.error.error
                } );
            } )
        );
    }

    updPass( updPass: UpdPass ): Observable<ResetPass> {
        return this.apiSvc.updPass( updPass ).pipe(
            map( ( res: any ) => {
                return {
                    success: true,
                    error: '',
                };
            } ),
            catchError( ( err: any ) => {
                return throwError( {
                    success: false,
                    error: err.error.error
                } );
            } )
        );
    }

    login() {
        this.router.navigate( [ 'home/users' ] );
    }

    logout() {
        this.tokenSvc.delToken();
        this.router.navigate( [ 'login' ] );
    }

    checkToken(): boolean {
        const isTokenS = this.tokenSvc.getToken( true ) !== null;
        const isTokenL = this.tokenSvc.getToken( false ) !== null;

        return isTokenS || isTokenL;
    }

}
