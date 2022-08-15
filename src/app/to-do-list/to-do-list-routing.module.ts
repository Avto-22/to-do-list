import { ToDoListComponent } from './to-do-list.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";

export const routes: Route[] = [
    {
        path: '',
        component: ToDoListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToDoListRoutingModule { }