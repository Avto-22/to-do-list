import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../state';

export const selectTodo = createFeatureSelector<TodoState>('todo');

export const selectTasks = createSelector(
    selectTodo,
    (state:TodoState)=>state.taskTable
);

export const selectProgressTable = createSelector(
    selectTodo,
    (state:TodoState)=>state.progressTable
);

export const selectDoneTable = createSelector(
    selectTodo,
    (state:TodoState)=>state.doneTable
);

export const selectLoading = createSelector(
    selectTodo,
    (state:TodoState)=>state.loading
);

export const selectError = createSelector(
    selectTodo,
    (state:TodoState)=> state.error
);