import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskStoreService } from './services/task-store.service';
import { Store } from '@ngrx/store';
import { TodoSelectors } from './store/selectors';
import { TodoActions } from './store/actions';
import { Task, TaskType } from './to-do-list.model';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  editTask:string;
  editTaskIndex:number;
  editTasksTable:string;
  isOpenPopUp:boolean=false;
  table=TaskType;

  tasks$ = this.store.select(TodoSelectors.selectTasks);
  progressTable$ = this.store.select(TodoSelectors.selectProgressTable);
  doneTable$ = this.store.select(TodoSelectors.selectDoneTable);
  loading$ = this.store.select(TodoSelectors.selectLoading);
  error$ = this.store.select(TodoSelectors.selectError);

  constructor(
    private AuthService:AuthService,
    public taskStoreService:TaskStoreService,
    private store:Store
    ) { }

  ngOnInit() {
    this.store.dispatch(TodoActions.getTask());
  }

  ngOnDestroy(): void {
    this.taskStoreService.allitems=[];
    this.taskStoreService.allItemsIdAndName=[];
    this.taskStoreService.taskIds=[];
  }

  edit(task:string, index:number, table:string){
    this.editTask=task;
    this.editTaskIndex=index;
    this.editTasksTable=table;
    this.isOpenPopUp=!this.isOpenPopUp;
  }

  delete(task:Task){
    this.store.dispatch(TodoActions.deleteTask({task}));
  }

  move(task:Task, newTable:TaskType, index:number){
    this.store.dispatch(TodoActions.moveTask({
      task,
      newTable,
      index
    }))
  }

  setOpenPopUp(newValue:boolean){
    this.isOpenPopUp=newValue;
  }

  signOut(){
    this.AuthService.signOut();
  }

}
