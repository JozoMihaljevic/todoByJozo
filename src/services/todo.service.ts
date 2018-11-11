import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private nextId: number;

  constructor(
  ) {

    const tasks = this.getTasks();

    if (tasks.length === 0) {
      this.nextId = 0;
    } else {
      const maxId = tasks[tasks.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  public getTasks(): Task[] {
    const localStorageItem = JSON.parse(localStorage.getItem('tasks'));
    return localStorageItem == null ? [] : localStorageItem.tasks;
  }

  public addTask(text: string) {
    const task = new Task(this.nextId, text);
    const tasks = this.getTasks();
    tasks.push(task);

    this.setLocalStorageTasks(tasks);
    this.nextId++;
  }

  public deleteTask(id: number) {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== id);
    this.setLocalStorageTasks(tasks);
  }

  private setLocalStorageTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify({ tasks: tasks }));
  }
}
