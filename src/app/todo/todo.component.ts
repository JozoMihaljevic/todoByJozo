import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  task: Task = null;
  tasks: Task[];
  text: string;

  constructor(private todoService: TodoService) {
    this.text = '';
  }

  ngOnInit() {
    this.tasks = this.todoService.getTasks();
    this.task = this.tasks[0];
  }

  newTask() {
    this.todoService.addTask(this.text);
    this.tasks = this.todoService.getTasks();
    this.task = this.tasks[0];
    this.text = '';
  }

  removeTask(id) {
    console.log(id);
    this.todoService.deleteTask(id);
    this.tasks = this.todoService.getTasks();
  }

}
