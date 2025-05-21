import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Task } from '../../models/task';
import {TaskService} from "../../services/task.service";
import {firstValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask = false;
  newTaskTitle = '';
  newTaskDeadline = '';
  searchTerm = '';  


  constructor(private taskService: TaskService,
        private cd: ChangeDetectorRef
  ) {}

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

  private async loadTasks() {
    const tasks = await firstValueFrom(this.taskService.getTasks());
    if (Array.isArray(tasks)) {
      this.tasks = [...tasks].reverse();
      this.cd.markForCheck();    
    }
  }


  private sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
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
    this.tasks = [taskCreated, ...this.tasks];  
    this.cd.markForCheck();  
    }
    this.showAddTask = false;
    this.newTaskTitle = '';
    this.newTaskDeadline = '';
  }

  async toggleCompleted(task: Task) {

  const isChecked = !task.completed;
  task.completed = isChecked;
  this.cd.markForCheck();

  try {
    const updated = await firstValueFrom(this.taskService.updateTask(task.id, { completed: isChecked }));
      this.tasks = this.tasks.map(t => (t.id === task.id ? updated : t));
      this.cd.markForCheck();
  } catch {
    task.completed = !isChecked;
    this.cd.markForCheck();
  }
  }

    trackById(index: number, task: Task) {
    return task.id;
  }


  async toggleFavorite(task: Task) {

    const isChecked = !task.favorite;
    task.favorite = isChecked;
    this.cd.markForCheck();    

    try {
      const updated = await firstValueFrom(
        this.taskService.updateTask(task.id, { favorite: task.favorite })
      );
      task.favorite = updated.favorite;
      this.tasks = this.sortTasks(
        this.tasks.map(t => (t.id === task.id ? updated : t))
      );
      this.cd.markForCheck();
    } catch (err) {
      console.error(err);
      task.favorite = !task.favorite;  
      this.cd.markForCheck();
    }
  }

  

  async deleteTask(id: string) {
    await firstValueFrom(this.taskService.deleteTask(id));
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.cd.markForCheck();
  }
}
