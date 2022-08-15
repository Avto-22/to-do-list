import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component';;

const redirectLoggedToItems=()=>redirectLoggedInTo(['to-do-list']);
const redirectUnauthorizedToLogin =()=>redirectUnauthorizedTo(['auth']);

export const routes:Route[]=[
    {
        path:'',
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe:redirectLoggedToItems
        },
        loadChildren: ()=>import('./auth/auth.module').then(x=>x.AuthModule)
    },
    
    {
        path:'to-do-list',
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe:redirectUnauthorizedToLogin
        },
        loadChildren: ()=> import('./to-do-list/to-do-list.module').then(x=>x.ToDoListModule)
    },

    {
        path:'**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule. forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}