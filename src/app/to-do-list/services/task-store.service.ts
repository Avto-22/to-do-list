import { LoadingService } from './../../services/loading.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { TaskType, Task } from '../to-do-list.model';


@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {

  allitems: Task[] = [];

  taskIds = [];

  allItemsIdAndName: { task: string, id: string }[] = [];

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }

  async addTask(task: string) {
    let newTask = {
      name: task,
      table: TaskType.TODO,
      uid: this.authService.user.uid
    }
    this.allItemsIdAndName = [{
      task,
      id: await (await this.firestore.collection('tasks').add(newTask)).id
    },
    ...this.allItemsIdAndName
    ];
    return newTask;
  }


  async getQuerySnapshot() {
    return this.firestore.collection('tasks', (ref) => ref.where('uid', '==', this.authService.user.uid)).get().pipe(
      tap(result => {
        result.docs.forEach(task => {
          this.taskIds = [task.id, ...this.taskIds]
        });
      })
    ).toPromise();
  }

  async setItemsArray(id: string) {
    await this.firestore.collection('tasks', (ref) => ref.where('uid', '==', this.authService.user.uid)).doc(id).get().pipe(
      map<any, Task>(res => {
        return res.data()
      }),
      tap(endResponse => {
        this.allitems = [endResponse, ...this.allitems];
        this.allItemsIdAndName = [{
          task: endResponse.name,
          id
        },
        ...this.allItemsIdAndName]
      })
    ).toPromise();
  }

  async getItems() {
    await this.getQuerySnapshot();
    for (let i = 0; i < this.taskIds.length; i++) {
      await this.setItemsArray(this.taskIds[i]);
    }
    return this.allitems;
  }

  async deleteTask(task: string) {
    for (let i = 0; i < this.allItemsIdAndName.length; i++) {
      if (this.allItemsIdAndName[i].task == task) {
        this.allitems = this.allitems.filter(x => x.name != task);
        await this.firestore.collection('tasks', (ref) => ref.where('uid', '==', this.authService.user.uid)).doc(this.allItemsIdAndName[i].id).delete();
        this.allItemsIdAndName = this.allItemsIdAndName.filter(x => x.task != task);
      }
    }
    return this.allitems;
  }

  async updateTask(task: string, newTask: string, index: number, table: string) {
    if (!task || !newTask || task.trim() == newTask.trim()) {
      return {
        newTask: '',
        index: 0,
        table: ''
      };
    }
    for (let i = 0; i < this.allItemsIdAndName.length; i++) {
      if (task == this.allItemsIdAndName[i].task) {
        this.firestore.collection('tasks', (ref) => ref.where('uid', '==', this.authService.user.uid)).doc(this.allItemsIdAndName[i].id).update({ name: newTask });
        this.allItemsIdAndName = [{ task: newTask, id: this.allItemsIdAndName[i].id }, ...this.allItemsIdAndName.filter((_, x) => x != i)];
      }
    }
    return {
      newTask,
      index,
      table
    }
  }

  async move(task: Task, newTable: TaskType, index: number) {
    for (let i = 0; i < this.allItemsIdAndName.length; i++) {
      if (task.name == this.allItemsIdAndName[i].task) {
        this.firestore.collection('tasks', (ref) => ref.where('uid', '==', this.authService.user.uid)).doc(this.allItemsIdAndName[i].id).update({ table: newTable });
      }
    }
    let moveTask = { ...task, table: newTable }
    return {
      task: moveTask,
      oldTable: task.table,
      index
    };
  }

}
