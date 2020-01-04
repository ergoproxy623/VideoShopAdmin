import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { UserBlockComponent } from './components/user-block/user-block.component';
import { ContentBlockComponent } from './components/content-block/content-block.component';
import { CustomMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonToggleModule, MatGridListModule, MatSelectModule} from '@angular/material';



@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        HeaderComponent,
        UsersPageComponent,
        ContentPageComponent,
        UserBlockComponent,
        ContentBlockComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSelectModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
