import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { AddListItemComponent } from './add-list-item/add-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditListItemComponent } from './edit-list-item/edit-list-item.component';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({todo: todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    SharedModule
  ],
  declarations: [ToDoListComponent, AddListItemComponent, EditListItemComponent]
})
export class ToDoListModule { }
