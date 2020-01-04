import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { AuthenticationGuard } from './authentication.guard';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PreviewVideoComponent } from './components/preview-video/preview-video.component';
import { PhotosPageComponent } from './components/photos-page/photos-page.component';
import { SoftVideoComponent } from './components/soft-video/soft-video.component';
import { HardVideoComponent } from './components/hard-video/hard-video.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    {
        path: 'change',
        component: ChangePasswordComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/users',
        component: UsersPageComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/preview',
        component: PreviewVideoComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/video',
        component: ContentPageComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/photos',
        component: PhotosPageComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/video/easy',
        component: SoftVideoComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'home/video/hard',
        component: HardVideoComponent,
        canActivate: [ AuthenticationGuard ]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule( {
    imports: [
        RouterModule.forRoot( routes ),
        LoadingBarRouterModule
    ],
    exports: [ RouterModule ],
    providers: [ AuthenticationGuard ]
} )
export class AppRoutingModule {
}
