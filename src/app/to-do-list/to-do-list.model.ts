export enum TaskType{
    TODO='tasks',
    PROGRESS='progress',
    DONE="done",
}

export interface Task{
    name:string;
    uid:string;
    table:string;
}