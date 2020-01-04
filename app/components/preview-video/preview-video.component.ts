import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component( {
    selector: 'app-preview-video',
    templateUrl: './preview-video.component.html',
    styleUrls: [ './preview-video.component.scss' ]
} )
export class PreviewVideoComponent implements OnInit {
    fullUrl: string;
    updUrl: string;
    formAdd: FormGroup;
    formUpd: FormGroup;
    previewUrl: any;
    previewKey: string;
    successKey: boolean;

    hide = false;

    constructor(
        private fb: FormBuilder,
        private httpSvc: ApiService,
        private sanitizer: DomSanitizer,
        private toast: ToastrService,
    ) {

        this.formAdd = fb.group( {
            updURL: '',
        } );
    }
// show hiden button
       clearField(input) {
          if (input.value == null) {
              this.hide = true;
          } else {
              this.hide = false;
          }
      }

      // clear input value
      clearFieldValue(input) {
          if (input.value !== null) {
              this.updUrl = '';
              this.hide = false;
          }
      }
// show tostr message if send success true
    showSuccess( msg: string ) {
        this.toast.success(
            msg,
            'Успешно!',
            { timeOut: 3000 }
        );
    }
// show tostr message if send success false
    showError() {
        this.toast.error(
            'Ошибка добавления URL!',
            'Ошибка!',
            { timeOut: 3000 }
        );
    }
// show message if URL empty or wrong
    showErrorKey() {
        this.toast.error(
            'Ошибка добавления URL! Пустой или несуществующий плейлист',
            'Ошибка!',
            { timeOut: 5000 }
        );
    }
// send update URL form and validate input
    onSubmitUpd() {
        const controls = this.formUpd.controls;

        if ( this.formUpd.invalid ) {
            Object.keys( controls ).forEach( controlName => controls[ controlName ].markAsTouched() );
          //  Object.keys( controls ).forEach( controlName => controls[
            //  controlName ].markAsDirty() );

            return;
        }

        this.updPreview();
        this.formUpd.reset();

    }

    isControlInvalidUpd( controlName: string ): boolean {
        const control = this.formUpd.controls[ controlName ];

        const result = control.invalid && control.touched;

        return result;
    }

    private initFormUpd() {
        this.formUpd = this.fb.group( {
            updUrl: [ '', [
                Validators.required,
                Validators.maxLength( 200 ),
                Validators.pattern( /^https?:\/\/(www.youtube.com|youtube.com)\/(watch|playlist)\?(.*)$/ )
            ]
            ]
        } );
    }



    // extract playlist key
    extractYTListKey( url: string ): string {
        return url.replace(
            /.*list=(.*)$/,
            '$1',
        );

    }

    addPreview() {
        this.httpSvc.addKeyPreview( {
            preview_url: this.extractYTListKey(
                this.fullUrl )
        } )
            .subscribe(
                ( res: any ) => {
                    this.getPreviewKey();

                    this.showSuccess( 'Превью добавленно.' );

                },
                ( err: any ) => {

                    this.showError();

                },
            );
    }

    updPreview() {
        console.log( this.fullUrl );
        this.httpSvc.updKeyPreview( {
            preview_url: this.extractYTListKey(
                this.updUrl )
        } )
            .subscribe(
                ( res: any ) => {
                    this.getPreviewKey();

                    this.showSuccess( 'Ссылка превью обновленна.' );

                },
                ( err: any ) => {

                    this.showError();
                },
            );
    }

    getPreviewKey() {
        this.httpSvc.getPreview().subscribe(
            ( res: any ) => {
                this.successKey = res.success;

                this.previewKey = res.data.preview_url;
                this.previewUrl =
                    this.sanitizer.bypassSecurityTrustResourceUrl( 'https://www.youtube.com/embed/videoseries?list='
                        + this.previewKey );
            },
            ( err: any ) => {
                console.log( err );
                this.previewUrl =
                    this.sanitizer.bypassSecurityTrustResourceUrl( 'https://www.youtube.com/embed/videoseries?list=PLqHlAwsJRxAMZs12qs_f0CYXjyGwC1yW4' );
                this.showErrorKey();
            },
        );
    }

    ngOnInit() {
        this.initFormUpd();
        this.getPreviewKey();

    }

}



