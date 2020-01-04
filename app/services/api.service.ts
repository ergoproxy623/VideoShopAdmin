import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Admin } from '../models/admin';
import { NewVideo } from '../models/new-video';
import { UpdVideo } from '../models/upd-video';

import { Email } from '../models/email';
import { UpdPass } from '../models/upd-pass';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { KeyPreview } from '../models/key-preview';
import { NewPhoto } from '../models/new-photo';
import { UpdPhoto } from '../models/upd-photo';
import { VideoStatus } from '../models/video-status';


@Injectable( {
    providedIn: 'root'
} )
export class ApiService {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    private _api = {
        host: environment.apiUrl,
        auth: '/loginAdmin',
        resetPass: '/password/reset',
        updPass: '/updatePassword',
        user: '/user',
        video: '/video',
        video1: '/showVideo1',
        video2: '/showVideo2',
        all: '/allVideosAllUsers',
        preview: '/preview',
        image: '/image',
    };

    get api() {
        return this._api;
        console.log(this._api);
    }

    auth( admin: Admin ) {
        return this.http.post(
            `${ this.api.host }${ this.api.auth }`,
            admin,
        );
    }
// reset password
    resetPass( email: Email ) {
        return this.http.post(
            `${ this.api.host }${ this.api.resetPass }`,
            email,
        );
    }
// change password
    updPass( updPass: UpdPass ) {
        return this.http.post(
            `${ this.api.host }${ this.api.updPass }`,
            updPass,
        );
    }

    getUsers() {
        return this.http.get(
            `${ this.api.host }${ this.api.user }`,
        );
    }

    addVideo1( newVideo: NewVideo) {
        return this.http.post(
            `${ this.api.host }${ this.api.video }`,
            newVideo
        );
    }
    addVideo2( newVideo: NewVideo) {
        return this.http.post(
            `${ this.api.host }${ this.api.video }`,
            newVideo
        );
    }
// edit video
    updVideo( id: number, updVideo: UpdVideo ) {
        return this.http.post(
            `${ this.api.host }${ this.api.video }/${ id }`,
            updVideo,
        );
    }
// delete video
    delVideo( id: number ) {
        return this.http.delete(
            `${ this.api.host }${ this.api.video }/${ id }`,
        );
    }

// watch video
    getVideoEasy() {
        return this.http.get(
            `${ this.api.host }${ this.api.video1}`,
        );
    }
    // watch video
    getVideoHard() {
        return this.http.get(
            `${ this.api.host }${ this.api.video2}`,
        );
    }
// add preview playlist
    addKeyPreview( newKeyPreview: KeyPreview ) {
        return this.http.post(
            `${ this.api.host }${ this.api.preview }`,
            newKeyPreview,
        );
    }
// update preview playlist
    updKeyPreview( newKeyPreview: KeyPreview ) {
        return this.http.put(
            `${ this.api.host }${ this.api.preview }`,
            newKeyPreview,
        );
    }
// watch preview
    getPreview() {
        return this.http.get(
            `${ this.api.host }${ this.api.preview}`,
        );
    }


    addPhoto( formData: NewPhoto) {
        return this.http.post(
            `${ this.api.host }${ this.api.image }`,
            formData );
    }
// edit photo
    updPhoto( id: number, updPhoto: UpdPhoto ) {
        return this.http.post(
            `${ this.api.host }${ this.api.image }/${ id }`,
            updPhoto,
        );
    }
// delete photo
    delPhoto( id: number ) {
        return this.http.delete(
            `${ this.api.host }${ this.api.image }/${ id }`,
        );
    }
// watch photo
    getPhoto() {
        return this.http.get(
            `${ this.api.host }${ this.api.image}`,
        );
    }
}
