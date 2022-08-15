import { TaskType } from './../../to-do-list.model';
import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../state';
import { TodoActions, TodoStoreActions } from '../actions';

const initialState: TodoState = {
        taskTable: [],
        progressTable: [],
        doneTable: [],
        loading: false,
        error: ''
}

export const todoReducer = createReducer(
        initialState,

        // getTask
        on(TodoActions.getTask, (state) => ({
                ...state,
                loading: true

        })),

        on(TodoStoreActions.getTasksSuccessful, (state, { taskTable, progressTable, doneTable }) => ({

                ...state,
                taskTable,
                progressTable,
                doneTable,
                loading: false
        })),

        on(TodoStoreActions.getTasksFailed, (state, { error }) => ({
                ...state,
                loading: false,
                error
        })),

        //addTask
        on(TodoActions.addTask, (state) => ({
                ...state,
                loading: true
        })),

        on(TodoStoreActions.addTaskSuccessful, (state, { task }) => ({
                ...state,
                taskTable: [task, ...state.taskTable],
                loading: false
        })),

        on(TodoStoreActions.addTaskFailed, (state, { error }) => ({
                ...state,
                loading: false,
                error
        })),

        //deleteTask
        on(TodoActions.deleteTask, (state) => ({
                ...state,
                loading: true
        })),

        on(TodoStoreActions.deleteTaskSuccessful, (state, { taskTable, progressTable, doneTable }) => ({
                ...state,
                loading: false,
                taskTable,
                progressTable,
                doneTable
        })),

        on(TodoStoreActions.deleteTaskFailed, (state, { error }) => ({
                ...state,
                loading: false,
                error
        })),

        //updateTask
        on(TodoActions.updateTask, (state) => ({
                ...state,
                loading: true
        })),

        on(TodoStoreActions.updateTaskSuccessful, (state, { newTask, index, table }) => {
                if (table == TaskType.TODO) {
                        return {
                                ...state,
                                loading: false,
                                taskTable: state.taskTable.map((x, i) => {
                                        if (i == index) {
                                                return {
                                                        ...state.taskTable[index],
                                                        name: newTask
                                                }
                                        }
                                        return x;
                                })
                        }
                } else if (table == TaskType.PROGRESS) {
                        return {
                                ...state,
                                loading: false,
                                progressTable: state.progressTable.map((x, i) => {
                                        if (i == index) {
                                                return {
                                                        ...state.progressTable[index],
                                                        name: newTask
                                                }
                                        }
                                        return x;
                                })
                        }
                } else {
                        return {
                                ...state,
                                loading: false,
                                doneTable: state.doneTable.map((x, i) => {
                                        if (i == index) {
                                                return {
                                                        ...state.doneTable[index],
                                                        name: newTask
                                                }
                                        }
                                        return x;
                                })
                        }
                }
        }),

        on(TodoStoreActions.updateTaskFailed, (state, { error }) => ({
                ...state,
                loading: false,
                error
        })),

        //move task
        on(TodoActions.moveTask, (state) => ({
                ...state,
                loading: true
        })),

        on(TodoStoreActions.moveTaskSuccessful, (state, { task, oldTable, index }) => {
                
                if (task.table == TaskType.TODO) {
                        return {
                                ...state,
                                loading: false,
                                taskTable: [task, ...state.taskTable],
                                progressTable: state.progressTable.filter((_,i)=>i!=index)
                        }
                } else if (task.table == TaskType.PROGRESS) {
                        if(oldTable==TaskType.TODO){
                                return {
                                        ...state,
                                        loading: false,
                                        progressTable: [task, ...state.progressTable],
                                        taskTable: state.taskTable.filter((_,i)=>i!=index)
                                }
                        } else{
                                return {
                                        ...state,
                                        loading:false,
                                        progressTable: [task, ...state.progressTable],
                                        doneTable: state.doneTable.filter((_,i)=>i!=index)
                                }
                        }
                        
                } else {
                        return {
                                ...state,
                                loading: false,
                                doneTable: [task, ...state.doneTable],
                                progressTable: state.progressTable.filter((_,i)=>i!=index)
                        }
                }
        }),

        on(TodoStoreActions.moveTaskFailed, (state,{error})=>({
                ...state,
                loading:false,
                error
        }))

);