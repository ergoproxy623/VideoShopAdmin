import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { ContentPageComponent, } from './components/content-page/content-page.component';

import { CustomMaterialModule } from './material.module';
import {
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
} from '@angular/material';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SwitchInfoComponent } from './components/switch-info/switch-info.component';
import { PreviewVideoComponent } from './components/preview-video/preview-video.component';

import { PhotosPageComponent } from './components/photos-page/photos-page.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { ProgressComponent } from './shared/progress/progress.component';
import { DialogContentComponent } from './components/content-page/dialog-content/dialog-content.component';
import { DialogPhotoComponent } from './components/photos-page/dialog-photo/dialog-photo.component';
import { SoftVideoComponent } from './components/soft-video/soft-video.component';
import { HardVideoComponent } from './components/hard-video/hard-video.component';




@NgModule( {
    declarations: [
        AppComponent,
        LoginFormComponent,
        HeaderComponent,
        UsersPageComponent,
        ContentPageComponent,
        ChangePasswordComponent,
        SwitchInfoComponent,
        PreviewVideoComponent,
        PhotosPageComponent,
        FileUploadComponent,
        ProgressComponent,
        DialogContentComponent,
        DialogPhotoComponent,
        SoftVideoComponent,
        HardVideoComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSelectModule,
        MatDialogModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatCheckboxModule,
        FormsModule,
        LoadingBarModule,
        ToastrModule.forRoot(),
        LoadingBarRouterModule,
        HttpClientModule,
        MatTabsModule,
        LoadingBarHttpClientModule,
        MatProgressBarModule,
    ],
    entryComponents: [
       DialogContentComponent, DialogPhotoComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
