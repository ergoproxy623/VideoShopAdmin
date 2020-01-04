import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit {

    constructor(
        private authSvc: AuthService,
    ) {
    }

    isVisible = true;
    isMenuVisible = false;
// clare login data in session and local storage
    logout() {
        this.authSvc.logout();
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
    }

    ngOnInit() {
        const isToken = this.authSvc.checkToken();
        if ( isToken ) {
            this.authSvc.login();
        } else {
            this.authSvc.logout();
        }


        this.authSvc.isAuth$.subscribe(
            isAuth => {
                this.isVisible = isAuth;
            },
        );
    }

}
