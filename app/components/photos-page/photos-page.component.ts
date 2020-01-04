import { Component, OnInit } from '@angular/core';
import {
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { ApiService } from '../../services/api.service';
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpResponse
} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs/internal/util/pipe';
import { tap } from 'rxjs/internal/operators/tap';
import { requiredFileType } from '../../shared/file-upload/upload-file-validators';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DialogPhotoComponent } from './dialog-photo/dialog-photo.component';
import { requiredValueInput } from '../../shared/input-value-validators';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
    return tap( ( event: HttpEvent<T> ) => {
        if ( event.type === HttpEventType.UploadProgress ) {
            cb( Math.round( ( 100 * event.loaded ) / event.total ) );
        }
    } );
}

export function toResponseBody<T>() {
    return pipe(
        filter( ( event: HttpEvent<T> ) => event.type === HttpEventType.Response ),
        map( ( res: HttpResponse<T> ) => res.body )
    );
}

@Component( {
    selector: 'app-photos-page',
    templateUrl: './photos-page.component.html',
    styleUrls: [ './photos-page.component.scss' ]
} )
export class PhotosPageComponent implements OnInit {
    dialogRef: MatDialogRef<DialogPhotoComponent>;

    newarray: [];
    photos: [];
    hideMe = [];
    description: string;
    private id: number;
    progress = 0;
    selectedId: number;
    selectedIdx: number;
    private idx: number;
    success = false;
    name: string;
    hide: boolean;
    formEditPhoto: FormGroup;
    nameValue: string;

    sendImage = new FormGroup( {
        name: new FormControl( null, [Validators.required, requiredValueInput() ] ),
        image_url: new FormControl( null, [ Validators.required, requiredFileType( 'jpg', 'png' ) ] )
    } );

    constructor( private http: HttpClient,
                 private  httpSvc: ApiService,
                 private authSvc: AuthService,
                 private toast: ToastrService,
                 private fb: FormBuilder,
                 public dialog: MatDialog,
    ) {
    }

// cleare input field
    controlClear( key ) {
        this.sendImage.controls[ key ].setValue( '' );
    }
//
    returnHide() {

        this.hideMe.splice( 0, 400, );

    }

    trackByFn( index, photo ) {
        return photo.id;
    }
// open confirm modal window
    openDialog( id, idx ) {
        this.selectedId = id;
        this.selectedIdx = idx;
        this.dialogRef = this.dialog.open( DialogPhotoComponent, {
            disableClose: false
        } );
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you' +
            ' want to delete?';

        this.dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                this.deletePhoto( this.selectedId );
                this.photos.splice( this.selectedIdx, 1 );
            }
            this.dialogRef = null;
        } );
    }
// send upload file ForData and + input field
    submit() {
        this.success = false;
        if ( !this.sendImage.valid ) {
            markAllAsDirty( this.sendImage );
            return;
        }
        console.log( markAllAsDirty( this.sendImage ) );
        this.http.post( `https://furniture.grassbusinesslabs.ml/api/image`, toFormData( this.sendImage.value ), {
            observe: 'events',
            reportProgress: true,
        } ).pipe(
            uploadProgress( progress => ( this.progress = progress ) ),
            toResponseBody()
        ).subscribe( ( res: any ) => {
            this.showSuccess( 'Фото добавленно.' );
            this.progress = 0;
            this.success = true;

            if ( this.success ) {
                this.getPhotos();
            }

            this.sendImage.reset();

        } );
    }
// validate and sand edit FormData
    onSubmit( id, idx ) {
        const controls = this.formEditPhoto.controls;
        this.selectedId = id;
        this.selectedIdx = idx;

        if ( this.formEditPhoto.invalid ) {
            Object.keys( controls ).forEach( controlName => controls[ controlName ].markAsTouched() );

            return;
        }
        this.editPhoto( this.selectedId, this.name );
        console.log( this.formEditPhoto.value );
    }

    isControlInvalid( controlName: string ): boolean {
        const control = this.formEditPhoto.controls[ controlName ];

        const result = control.invalid && control.touched;

        return result;
    }

    private initForm() {
        this.formEditPhoto = this.fb.group( {
            title: [ '', [
                Validators.required,
            ]
            ]
        } );
    }
// show tostr success
    showSuccess( msg: string ) {
        this.toast.success(
            msg,
            'Успешно!',
            { timeOut: 3000 }
        );
    }
// show tostr error
    hasError( field: string, error: string ) {
        const control = this.sendImage.get( field );
        return control.dirty && control.hasError( error );
    }
// delete photo
    deletePhoto( id ) {
        this.httpSvc.delPhoto( id ).subscribe(
            send => {
                this.showSuccess( 'Фото удалено.' );
            },
            error => console.log( 'There was an error: ', error ) );

        console.log( this.idx );
    }
// edit name this photo
    editPhoto( id, name ) {
        this.httpSvc.updPhoto( id, {
            name
        } ).subscribe(
            send => {
                this.showSuccess( 'Фото отредактированно.' );

            },
            error => console.log( 'There was an error: ', error ) );

    }
// get photos from server
    getPhotos() {
        this.httpSvc.getPhoto().subscribe(
            ( res: any ) => {
                this.photos = res.data;
                // @ts-ignore
                this.newarray = this.photos.reverse();
            },
            ( err: any ) => {
                if ( err.status === 401 ) {
                    this.authSvc.logout();
                }
            }
        );
    }

    ngOnInit(): void {
        this.initForm();
        this.getPhotos();
    }

}

export function markAllAsDirty( form: FormGroup ) {
    for ( const control of Object.keys( form.controls ) ) {
        form.controls[ control ].markAsDirty();
    }
}

export function toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys( formValue ) ) {
        const value = formValue[ key ];
        formData.append( key, value );
    }

    return formData;

}







