import { createAction, props } from "@ngrx/store";
import { Task } from '../../to-do-list.model';
import { TaskType } from '../../to-do-list.model';

export const getTask=createAction(
    "[to-do-list Page] get tasks"
);

export const addTask=createAction(
    "[add-list-item Page] add task",
    props<{name:string}>()
);

export const deleteTask=createAction(
    "[to-do-list Page] delete task",
    props<{task:Task}>()
);

export const updateTask=createAction(
    "[edit-list-item Page] edit task",
    props<{
        task:string,
        newTask:string,
        index:number,
        table:string
    }>()
);

export const moveTask=createAction(
    "[to-do-list-page] move list item",
    props<{
        task: Task,
        newTable: TaskType,
        index: number
    }>()
);