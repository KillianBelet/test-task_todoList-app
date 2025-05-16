import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Task } from '../../models/task';
import {TaskService} from "../../services/task.service";
import {firstValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask = false;
  newTaskTitle = '';
  newTaskDeadline = '';
  searchTerm = '';  


  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  get filteredTasks(): Task[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.tasks;
    }
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(term)
    );
  }

  async loadTasks() {
    const tasks = await firstValueFrom(this.taskService.getTasks());
    if(Array.isArray(tasks)){
      this.tasks = tasks.reverse();
    }
  }

  private sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      if (a.favorite === b.favorite) return 0;
      return a.favorite ? -1 : 1;
    });
  }

  isDueToday(deadline: number): boolean {
    const d = new Date(deadline);
    const now = new Date();
    return d.getFullYear() === now.getFullYear()
        && d.getMonth()    === now.getMonth()
        && d.getDate()     === now.getDate();
  }

  isOverdue(deadline: number): boolean {
    return new Date(deadline).getTime() < Date.now();
  }


  async addTask() {
    const taskCreated = await firstValueFrom(this.taskService.createTask(this.newTaskTitle, this.newTaskDeadline));
    if(taskCreated){
      this.tasks.unshift(taskCreated);
    }
    this.showAddTask = false;
    this.newTaskTitle = '';
    this.newTaskDeadline = '';
  }

  async toggleCompleted(task: Task) {

  const isChecked = !task.completed;
  task.completed = isChecked;

  try {
    const updated = await firstValueFrom(this.taskService.updateTask(task.id, { completed: isChecked }));
    task.completed = updated.completed;
  } catch {
    task.completed = !isChecked;
  }
  }

  async toggleFavorite(task: Task) {

    const isChecked = !task.favorite;
    task.favorite = isChecked;

    try {
      const updated = await firstValueFrom(
        this.taskService.updateTask(task.id, { favorite: task.favorite })
      );
      task.favorite = updated.favorite;
      this.tasks = this.sortTasks(this.tasks);
    } catch (err) {
      console.error(err);
      task.favorite = !task.favorite;  
    }
  }

  

  async deleteTask(id: string) {
    await firstValueFrom(this.taskService.deleteTask(id));
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
