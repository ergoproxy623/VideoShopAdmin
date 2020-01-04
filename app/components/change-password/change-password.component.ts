import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';




@Component( {
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [ './change-password.component.scss' ]
} )
export class ChangePasswordComponent implements OnInit {
    hide1 = true;
    hide2 = true;
    hide3 = true;
    public error: string;
    public success: boolean;
    public oldPassword: string;
    public newPassword: string;
    public newPassword2: string;
    formChangePassword: FormGroup;

    constructor( private fb: FormBuilder,
                 private toastr: ToastrService,
                 private authService: AuthService,
                 private router: Router,
    ) {
    }
// show tostr message success
    showNewPassword() {
        this.toastr.success( `Новый пароль выбран. Пожалуйста, в следующий раз используйте новый пароль`, 'Пароль отправлен!' );
    }

// show tostr error message
    showError( err: string ) {
        this.toastr.error(
            err,
            'Ошибка!',
            { timeOut: 3000 }
        );
    }

    // show tostr message if new password diferend
    showErrorPaswDifferend() {
            this.toastr.error('Новые пароли не одинаковые', 'Не совпадают' +
                ' пароли', {
                timeOut: 3000
            });

    }
// validate and send new paswword data
    onSubmit() {
        const controls = this.formChangePassword.controls;

        if ( this.formChangePassword.invalid ) {
            Object.keys( controls ).forEach( controlName => controls[ controlName ].markAsTouched() );

            return;
        }

        this.setNewPassword();
    }
// mark field
    isControlInvalid( controlName: string ): boolean {
        const control = this.formChangePassword.controls[ controlName ];

        const result = control.invalid && control.touched;

        return result;
    }
// validation form
    private initForm() {
        this.formChangePassword = this.fb.group( {


            oldPassword: [ '', [
                Validators.required,
                Validators.pattern( /[A-z0-9]{6}/ )
            ]
            ],
            newPassword: [ '', [
                Validators.required,
                Validators.pattern( /[A-z0-9]{6}/ )
            ]
            ],
            newPassword2: [ '', [
                Validators.required,
                Validators.pattern( /[A-z0-9]{6}/ )
            ]
            ],
        } );
    }
// rout redirect on users
    goUsers() {

        this.router.navigate(['/home/users']);
    }
// function send new password field value
    setNewPassword() {

        if (this.newPassword === this.newPassword2 ) {
            this.authService.updPass( {
                password: this.oldPassword,
                new_password: this.newPassword,
            } ).subscribe(
                send => {
                    this.success = send.success;
                    this.goUsers();
                    this.showNewPassword();
                },
                err => {
                    const e = err.error;

                    this.showError( e );

                },
            );
        } else {
            this.showErrorPaswDifferend();
        }

    }

    ngOnInit() {
        this.initForm();
    }

}
