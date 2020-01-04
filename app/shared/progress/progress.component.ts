import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent  {
  // progress upload file
  @Input() progress = 0;
  constructor() { }



}
