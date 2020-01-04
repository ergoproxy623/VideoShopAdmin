import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent {

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  public confirmMessage: string;



}
