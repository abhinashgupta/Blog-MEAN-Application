// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = { email: '' };
  blogs: any[] = [];

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      this.user.email = decodedToken.email;
    }

    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBar.open('Logout Successful', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'], 
    });
  }

  createNewBlog(): void {
    this.router.navigate(['/create-blog']);
  }

  editBlog(id: string): void {
    this.router.navigate([`/edit-blog/${id}`]);
  }

  deleteBlog(id: any): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      this.blogs = this.blogs.filter((blog) => blog._id !== id);
    });
  }
}
