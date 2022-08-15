import { FormGroup, FormControl } from '@angular/forms';
import { TaskStoreService } from './../services/task-store.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from '../store/actions';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css']
})
export class EditListItemComponent implements OnInit {

  form: FormGroup;

  isClose: boolean = false;

  @Input() taskFromPerent: string;
  @Input() taskIndexFromPerent: number;
  @Input() tasksTableFromPerent: string;
  @Output() closeClick: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private taskStoreService: TaskStoreService,
    private store: Store
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      task: new FormControl(this.taskFromPerent)
    })
  }

  close() {
    this.isClose = !this.isClose;
    this.closeClick.emit(!this.isClose);
  }

  update() {
    this.store.dispatch(TodoActions.updateTask({
      task: this.taskFromPerent,
      newTask: this.form.get('task').value,
      index: this.taskIndexFromPerent,
      table: this.tasksTableFromPerent
    }));
    this.closeClick.emit(this.isClose);
  }

}
