import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogContentComponent } from '../content-page/dialog-content/dialog-content.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { requiredFileType } from '../../shared/file-upload/upload-file-validators';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { filter, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
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


@Component({
  selector: 'app-soft-video',
  templateUrl: './soft-video.component.html',
  styleUrls: ['./soft-video.component.scss']
})
export class SoftVideoComponent implements OnInit {

  dialogRef: MatDialogRef<DialogContentComponent>;
  newarray: [];
  hideMe = [];
  videos = [];
  name: string;
  description: string;
  private id: number;
  selectedId: number;
  selectedIdx: number;
  private idx: number;
  success = false;
  formEdit: FormGroup;

  progress = 0;
// create FormData fields
  sendVideo = new FormGroup( {
    name: new FormControl( null, [Validators.required, requiredValueInput() ] ),
    description: new FormControl( null, [Validators.required, requiredValueInput() ]),
    status: new FormControl( 1 ),
    video_url: new FormControl( null, [ Validators.required, requiredFileType( '', 'mp4' ) ] )
  } );


  constructor( private http: HttpClient,
               private toast: ToastrService,
               private httpSvc: ApiService,
               private fb: FormBuilder,
               private authSvc: AuthService,
               public dialog: MatDialog,
  ) {
  }

// cleare input field for this control name
  controlClear( key ) {

    this.sendVideo.controls[ key ].setValue( '' );

  }
// hide edit formGroup
  returnHide() {

    this.hideMe.splice(0, 400 );

  }
// open modal window
  openDialog( id, idx ) {
    this.selectedId = id;
    this.selectedIdx = idx;
    this.dialogRef = this.dialog.open( DialogContentComponent, {
      disableClose: false
    } );
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you' +
        ' want to delete?';

    this.dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.deleteVideo( this.selectedId );
      }
      this.dialogRef = null;
    } );
  }
// validate and if ok - send edit FormData
  onSubmit( id, idx ) {
    this.selectedId = id;
    this.selectedIdx = idx;
    const controls = this.formEdit.controls;

    if ( this.formEdit.invalid ) {
      Object.keys( controls ).forEach( controlName => controls[ controlName ].markAsTouched() );

      return;
    }
    this.editVideo( this.selectedId, this.name, this.description );
    console.log( this.formEdit.value );
  }

  isControlInvalid( controlName: string ): boolean {
    const control = this.formEdit.controls[ controlName ];

    const result = control.invalid && control.touched;

    return result;
  }

  private initForm() {
    this.formEdit = this.fb.group( {
      title: [ '', [
        Validators.required,
      ]
      ],
      description: [ '', [
        Validators.required,
      ]
      ],

    } );
  }

  trackByFn( index, video ) {
    return video.id;
  }
// delete video
  deleteVideo( id ) {
    this.httpSvc.delVideo( id ).subscribe(
        send => {
          this.showSuccess( 'Видео удалено.' );

        },
        error => console.log( 'There was an error: ', error ) );
    this.videos.splice( this.selectedIdx, 1 );
  }
// edit video
  editVideo( id, name, description ) {
    this.httpSvc.updVideo( id, {
      name, description
    } ).subscribe(
        send => {
          this.showSuccess( 'Видео отредактированно.' );


        },
        error => console.log( 'There was an error: ', error ) );

  }
// how tostr success
  showSuccess( msg: string ) {
    this.toast.success(
        msg,
        'Успешно!',
        { timeOut: 3000 }
    );
  }
// submit FormData upload file and FormData field
  submit() {
    this.success = false;
    if ( !this.sendVideo.valid ) {
      markAllAsDirty( this.sendVideo );
      return;
    }
    this.http.post( `https://furniture.grassbusinesslabs.ml/api/video`, toFormData( this.sendVideo.value ), {
      observe: 'events',
      reportProgress: true,
    } ).pipe(
        uploadProgress( progress => ( this.progress = progress ) ),
        toResponseBody()
    ).subscribe( ( res: any ) => {
      this.showSuccess( 'Видео добавленно.' );
      this.progress = 0;
      this.success = true;
      if ( this.success ) {
        this.getVideos();
      }
      this.sendVideo.reset();
      this.sendVideo.controls.status.setValue( '1' );

    } );

  }

  hasError( field: string, error: string ) {
    const control = this.sendVideo.get( field );
    return control.dirty && control.hasError( error );
  }
// get videos of server
  getVideos() {
    this.httpSvc.getVideoEasy().subscribe(
        ( res: any ) => {
          this.videos = res.data;
          // @ts-ignore
          this.newarray = this.videos.reverse();
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
    this.getVideos();
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


