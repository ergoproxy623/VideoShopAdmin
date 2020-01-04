import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.scss']
})
export class DialogPhotoComponent {


  constructor(public dialogRef: MatDialogRef<DialogPhotoComponent>) {}

  public confirmMessage: string;


}

