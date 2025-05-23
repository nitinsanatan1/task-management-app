import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  
  taskForm: FormGroup;
  isSubmitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    // Initialize task form with validation
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      status: ['pending', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    // Stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.error = '';

    const newTask: Task = this.taskForm.value;

    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.taskAdded.emit(response.task);
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.error = error.error?.message || 'Failed to create task';
      }
    });
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'pending'
    });
  }
}
