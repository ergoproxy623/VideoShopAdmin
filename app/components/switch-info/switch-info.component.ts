import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-switch-info',
    templateUrl: './switch-info.component.html',
    styleUrls: [ './switch-info.component.scss' ]
} )
export class SwitchInfoComponent implements OnInit {
    // switch admin panel content
    links = [
        {
            path: [ '/home/users' ],
            label: 'Пользователи',
        },
        {
            path: [ '/home/preview' ],
            label: 'Демо-видео',
        },
        {
            path: [ '/home/video/hard' ],
            label: 'Видео',
        },
        {
            path: [ '/home/photos' ],
            label: 'Фото',
        },

    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
