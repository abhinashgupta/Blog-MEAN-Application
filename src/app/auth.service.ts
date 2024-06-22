import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://blog-mean-with-backend.onrender.com/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
