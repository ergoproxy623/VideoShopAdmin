import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-content-page',
    templateUrl: './content-page.component.html',
    styleUrls: [ './content-page.component.scss' ]
} )
export class ContentPageComponent implements OnInit {
    // switch video tab content
    links = [
        {
            path: [ '/home/video/hard' ],
            label: 'По сборке',
        },
        {
            path: [ '/home/video/easy' ],
            label: 'Для начинающих',
        },
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}


