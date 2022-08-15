import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from './auth.component';

export const routes: Route[] = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: '',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }