import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, { username, email, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            this.setToken(response.token);
            this.setUser(response.user);
          }
        })
      );
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            this.setToken(response.token);
            this.setUser(response.user);
          }
        })
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  // Get current user
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Get authentication token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Set authentication token
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Set user data
  private setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
