import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'https://blog-mean-with-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getCommentsForPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.apiUrl}/comments/?postId=${postId}`
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }
}
