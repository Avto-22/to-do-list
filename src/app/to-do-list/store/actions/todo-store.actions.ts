import { Task } from '../../to-do-list.model';
import { createAction, props } from "@ngrx/store";

export const getTasksSuccessful = createAction(
    "[task store service] get tasks successful",
    props<{
        taskTable: Task[],
        progressTable: Task[],
        doneTable: Task[]
    }>()
);

export const getTasksFailed = createAction(
    "[task store service] get tasks failed",
    props<{ error: string }>()
);

export const addTaskSuccessful = createAction(
    "[task store service] add task Successful",
    props<{ task: Task }>()
);

export const addTaskFailed = createAction(
    "[task store service] add task failed",
    props<{ error: string }>()
);

export const deleteTaskSuccessful = createAction(
    "[task store service] delete Successful",
    props<{
        taskTable: Task[],
        progressTable: Task[],
        doneTable: Task[]
    }>()
);

export const deleteTaskFailed = createAction(
    "[task store service] delete Failed",
    props<{ error: string }>()
);

export const updateTaskSuccessful = createAction(
    "[task store service] edit task Successful",
    props<{
        newTask: string,
        index: number,
        table: string
    }>()
);

export const updateTaskFailed = createAction(
    "[task store service] edit task Failed",
    props<{ error: string }>()
);

export const moveTaskSuccessful = createAction(
    "[task store service] move task successful",
    props<{
        task: Task,
        oldTable:string,
        index:number
      }>()
);

export const moveTaskFailed = createAction(
    "[task store service] move task failed",
    props<{error:string}>()
)