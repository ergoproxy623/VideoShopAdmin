import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'users', component: UsersPageComponent},
    { path: 'content', component: ContentPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
