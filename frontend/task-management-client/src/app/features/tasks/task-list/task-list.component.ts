import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../../core/services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFormComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  error = '';
  showAddForm = false;
  statusFilter = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = '';
    
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks = response.tasks;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load tasks';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.statusFilter === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.statusFilter);
    }
  }

  onFilterChange(status: string): void {
    this.statusFilter = status;
    this.applyFilter();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onTaskAdded(task: Task): void {
    this.tasks.unshift(task);
    this.applyFilter();
    this.showAddForm = false;
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t._id === updatedTask._id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.applyFilter();
    }
  }

  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter(task => task._id !== taskId);
    this.applyFilter();
  }
}
