import { Task } from '../../to-do-list.model';

export interface TodoState{
    taskTable:Task[];
    progressTable:Task[];
    doneTable:Task[];
    loading:boolean;
    error: string;
}