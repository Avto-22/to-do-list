import { TaskStoreService } from './../../services/task-store.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoActions, TodoStoreActions } from '../actions';
import { mergeMap, map, from, of, catchError } from 'rxjs';
import { TaskType } from '../../to-do-list.model';

@Injectable()
export class TodoEffects {
    getItems$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TodoActions.getTask),
            mergeMap(() => {
                return from(this.taskStoreService.getItems()).pipe(
                    map(tasks => TodoStoreActions.getTasksSuccessful({
                        taskTable: [...new Set(tasks.filter(item => item.table == TaskType.TODO))],
                        progressTable: [...new Set(tasks.filter(item => item.table == TaskType.PROGRESS))],
                        doneTable: [...new Set(tasks.filter(item => item.table == TaskType.DONE))]
                    })),
                    catchError((error) => {
                        return of(TodoStoreActions.getTasksFailed({ error }))
                    })
                );
            })
        )
    });


    addItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TodoActions.addTask),
            mergeMap(({ name }) => {
                return from(this.taskStoreService.addTask(name)).pipe(
                    map((task) => TodoStoreActions.addTaskSuccessful({ task })),
                    catchError((error) => {
                        return of(TodoStoreActions.addTaskFailed({ error }))
                    })
                )
            })
        )
    });

    updateItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TodoActions.updateTask),
            mergeMap(({ task, newTask, index, table }) => {
                return from(this.taskStoreService.updateTask(task, newTask, index, table)).pipe(
                    map((x) => TodoStoreActions.updateTaskSuccessful(x)),
                    catchError((error) => {
                        return of(TodoStoreActions.updateTaskFailed({ error }))
                    })
                )
            })
        )
    });

    deletItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TodoActions.deleteTask),
            mergeMap(res => {
                return from(this.taskStoreService.deleteTask(res.task.name)).pipe(
                    map((tasks) => TodoStoreActions.deleteTaskSuccessful({
                        taskTable: tasks.filter(item => item.table == TaskType.TODO),
                        progressTable: tasks.filter(item => item.table == TaskType.PROGRESS),
                        doneTable: tasks.filter(item => item.table == TaskType.DONE)
                    })),
                    catchError((error) => {
                        return of(TodoStoreActions.deleteTaskFailed({ error }))
                    })
                )
            })
        )
    });

    moveItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TodoActions.moveTask),
            mergeMap(({ task, newTable, index }) => {
                return from(this.taskStoreService.move(task, newTable, index)).pipe(
                    map(({ task, oldTable, index }) => TodoStoreActions.moveTaskSuccessful({ task, oldTable, index }))
                )
            }),
            catchError(error=> of(TodoStoreActions.moveTaskFailed({error})))
        )
    });

    constructor(
        private actions$: Actions,
        private taskStoreService: TaskStoreService
    ) { }
}