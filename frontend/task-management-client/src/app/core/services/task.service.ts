import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:5000/api';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
  user?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get HTTP headers with auth token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all tasks
  getAllTasks(): Observable<any> {
    return this.http.get(`${API_URL}/tasks`, { headers: this.getHeaders() });
  }

  // Get tasks by status
  getTasksByStatus(status: string): Observable<any> {
    return this.http.get(`${API_URL}/tasks/status/${status}`, { headers: this.getHeaders() });
  }

  // Get task by ID
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/tasks/${id}`, { headers: this.getHeaders() });
  }

  // Create a new task
  createTask(task: Task): Observable<any> {
    return this.http.post(`${API_URL}/tasks`, task, { headers: this.getHeaders() });
  }

  // Update a task
  updateTask(id: string, task: Partial<Task>): Observable<any> {
    return this.http.put(`${API_URL}/tasks/${id}`, task, { headers: this.getHeaders() });
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/tasks/${id}`, { headers: this.getHeaders() });
  }
}
