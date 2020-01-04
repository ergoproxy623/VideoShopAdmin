import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { Admin } from '../../models/admin';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: [ './login-form.component.scss' ]
} )
export class LoginFormComponent implements OnInit, OnDestroy {

    hide = true;
    visibility = false;
    isSessionOnly = true;

    admin: Admin;
    formAdmin: FormGroup;
    email: string;
    password: string;


    constructor(
        private fb: FormBuilder,
        private toast: ToastrService,
        private authSvc: AuthService,
        private router: Router,
    ) {
    }


// checkbox chooses where we save login data and token
    saveDestination() {
        this.isSessionOnly = !this.isSessionOnly;
    }
// gide form recovery password
    hideForm() {
        this.visibility = !this.visibility;
    }
// tostr show saccess
    showSuccess( msg: string ) {
        this.toast.success(
            msg,
            'Успешно!',
            { timeOut: 3000 }
        );
    }
// tostr show error
    showError( err: string ) {
        this.toast.error(
            err,
            'Ошибка!',
            { timeOut: 3000 }
        );
    }
// validate and submit login data
    onSubmit() {
        const controls = this.formAdmin.controls;

        if ( this.formAdmin.invalid ) {
            Object.keys( controls ).forEach( controlName => controls[ controlName ].markAsTouched() );

            return;
        }
        this.sendLogin();

    }

    isControlInvalid( controlName: string ): boolean {
        const control = this.formAdmin.controls[ controlName ];
        return control.invalid && control.touched;
    }

    private initForm() {
        this.formAdmin = this.fb.group( {
            login: [ '', [
                Validators.required
            ]
            ],
            password: [ '', [
                Validators.required,
                Validators.pattern( /[A-z0-9]{6}/ )
            ]
            ],
            email: [ '', [
                Validators.email
            ]
            ],

        } );
    }
// send login data
    sendLogin() {
        this.authSvc.auth(
            {
                email: this.email,
                password: this.password,
            },
            this.isSessionOnly
        ).subscribe(
            auth => {
                this.showSuccess( 'Вы авторизованы.' );
                this.router.navigate( [ 'home/users' ] );
            },
            err => {
                const e = err.error;

                this.showError( e );
            },
        );
    }
// recovery password send on email
    resetPassword() {
        this.authSvc.resetPass( {
            email: this.email,
        } ).subscribe(
            send => {
                this.showSuccess(
                    `Пароль успешно сброшен. 
                Новый пароль выслан на ваш email`
                );
            },
            err => {
                const e = err.error;

                this.showError( e );
            },
        );
    }

    ngOnInit() {
        this.initForm();
        this.authSvc.isAuth$.emit( false );
    }
// hide button change password and logout
    ngOnDestroy() {
        this.authSvc.isAuth$.emit( true );
    }

}



