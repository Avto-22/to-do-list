import { TaskStoreService } from './../services/task-store.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoActions } from '../store/actions';

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.css']
})
export class AddListItemComponent implements OnInit {

  form:FormGroup;

  constructor(
    private taskStoreService:TaskStoreService,
    private store:Store
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = new FormGroup({
      task: new FormControl('',[Validators.required])
    })
  }

  addTask(){
    // this.taskStoreService.addTask(this.form.get('task').value);
    this.store.dispatch(TodoActions.addTask({name:this.form.get('task').value}));
    this.form.get('task').setValue('');
  }

}
