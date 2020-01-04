import { Component } from '@angular/core';

let videos: ({ price: number; description: string; title: string; URL: string })[];
videos = [
    {
        title: 'Как собрать',
        URL: `https://material.angular.io/assets/img/examples/shiba2.jpg`,
        description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                  A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                  bred for hunting.`,
        price: 300,

    },
    {
        title: 'Как собрать',
        URL: `https://material.angular.io/assets/img/examples/shiba2.jpg`,
        description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                  A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                  bred for hunting.`,
        price: 300,

    },
    {
        title: 'Как собрать',
        URL: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                  A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                  bred for hunting.`,
        price: 300,

    },
];

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent {
 visibility = true;
 videos = videos;


  toggle() {
    this.visibility = !this.visibility;
  }
  delete() {
      console.log('delete');
  }
  constructor() { }
}
