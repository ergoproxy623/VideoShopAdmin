import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenSvc: TokenService,
    ) {

    }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const headersConfig = {
           // 'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Localization': 'ru',
            Authorization: ''
        };
        const tokenS = this.tokenSvc.getToken( true );
        const tokenL = this.tokenSvc.getToken( false );

        if ( tokenS !== null ) {
            headersConfig.Authorization = `Bearer ${ tokenS }`;
        }
        if ( tokenL !== null ) {
            headersConfig.Authorization = `Bearer ${ tokenL }`;
        }

        const request = req.clone( { setHeaders: headersConfig } );

        return next.handle( request );
    }
}
