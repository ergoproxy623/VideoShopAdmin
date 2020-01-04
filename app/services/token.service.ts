import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class TokenService {
// get and send confirm token
    getToken( isSessionOnly: boolean ) {
        if ( isSessionOnly ) {
            return sessionStorage.getItem( 'tokenAdmin623746238' );
        } else {
            return localStorage.getItem( 'tokenAdmin623746238' );
        }
    }

    setToken( token: string, isSessionOnly: boolean ) {
        if ( isSessionOnly ) {
            sessionStorage.setItem( 'tokenAdmin623746238', token );
        } else {
            localStorage.setItem( 'tokenAdmin623746238', token );
        }
    }

    delToken() {
            sessionStorage.removeItem( 'tokenAdmin623746238' );
            localStorage.removeItem( 'tokenAdmin623746238' );
    }
}
