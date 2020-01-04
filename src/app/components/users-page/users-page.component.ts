import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

    constructor(
        private dataSvc: DataService,
    ) {
    }

    users = [
        {
            id: 5,
            login: 'Spider',
            email: 'abrakadabra@dom.com',
            firstName: 'Василий',
            middleName: 'Алибабаевич',
            lastName: 'Пупкин',
            payments: [
                {
                    date: 4345343323,
                    payment: 500,
                    contentId: 4,
                    contentTitle: 'Как клеить мебель',
                },
                {
                    date: 5656856756,
                    payment: 300,
                    contentId: 6,
                    contentTitle: 'Как сделать табуретку',
                },
                {
                    date: 789767676,
                    payment: 1000,
                    contentId: 8,
                    contentTitle: 'Как сделать стул',
                }
            ]
        },
        {
            id: 7,
            login: 'Magneto',
            email: 'pots@dom.com',
            firstName: 'Петр',
            middleName: 'Василич',
            lastName: 'Степашкин',
            payments: [
                {
                    date: 4345343,
                    payment: 450,
                    contentId: 4,
                    contentTitle: 'Как клеить мебель',
                },
                {
                    date: 565685688,
                    payment: 300,
                    contentId: 7,
                    contentTitle: 'Как делать дубовую мебель',
                },
                {
                    date: 789767600,
                    payment: 1200,
                    contentId: 8,
                    contentTitle: 'Как сделать стул',
                }
            ]
        },
        {
            id: 9,
            login: 'Winter',
            email: 'abrakadabra@dom.com',
            firstName: 'Николай',
            middleName: 'Пантелеймонович',
            lastName: 'Филькин',
            payments: [
                {
                    date: 3345343323,
                    payment: 570,
                    contentId: 5,
                    contentTitle: 'Как лакировать поверхности',
                },
                {
                    date: 4656856756,
                    payment: 3300,
                    contentId: 6,
                    contentTitle: 'Как сделать табуретку',
                },
                {
                    date: 889767676,
                    payment: 1100,
                    contentId: 3,
                    contentTitle: 'Как выбрать материалы',
                }
            ]
        },
    ];
    columns = ['date', 'payment', 'contentTitle'];

    ngOnInit() {
        this.dataSvc.test();
    }
}
