import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://blog-mean-with-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/blogs`);
  }

  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/blogs/${id}`);
  }

  updateBlog(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/blogs/${id}`, blog);
  }

  deleteBlog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/blogs/${id}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/blogs`, blog);
  }
}
