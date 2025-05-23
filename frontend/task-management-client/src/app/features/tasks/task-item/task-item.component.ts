import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../../../core/services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  isEditing = false;
  editedTask: Task = {
    title: '',
    description: '',
    status: 'pending'
  };
  isSubmitting = false;
  error = '';

  constructor(private taskService: TaskService) {}

  startEditing(): void {
    this.editedTask = { ...this.task };
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  saveTask(): void {
    if (!this.task._id) return;
    
    this.isSubmitting = true;
    this.error = '';

    this.taskService.updateTask(this.task._id, this.editedTask).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isEditing = false;
        this.taskUpdated.emit(response.task);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.error = error.error?.message || 'Failed to update task';
      }
    });
  }

  updateStatus(status: 'pending' | 'in-progress' | 'completed'): void {
    if (!this.task._id) return;
    
    this.isSubmitting = true;
    this.error = '';

    this.taskService.updateTask(this.task._id, { status }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.taskUpdated.emit(response.task);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.error = error.error?.message || 'Failed to update task status';
      }
    });
  }

  deleteTask(): void {
    if (!this.task._id) return;
    
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.isSubmitting = true;
    this.error = '';

    this.taskService.deleteTask(this.task._id).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.taskDeleted.emit(this.task._id);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.error = error.error?.message || 'Failed to delete task';
      }
    });
  }

  getStatusClass(): string {
    switch (this.task.status) {
      case 'completed': return 'completed-task';
      case 'in-progress': return 'in-progress-task';
      case 'pending': return 'pending-task';
      default: return '';
    }
  }
}
