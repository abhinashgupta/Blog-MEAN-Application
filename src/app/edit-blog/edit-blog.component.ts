import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup;
  blog: Blog = {
    id: '',
    userId: '',
    title: '',
    content: '',
    summary: '',
    comments: [],
  };
  blogId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('Extracted ID from route:', id); 
      if (id) {
        this.blogId = id;
        this.loadBlog(id);
      } else {
        console.error('Blog ID is not defined');
      }
    });
  }

  loadBlog(id: string): void {
    console.log('Loading blog with ID:', id); 
    this.blogService.getBlog(id).subscribe(
      (blog) => {
        console.log('Fetched blog:', blog); 
        this.blog = blog;
        this.blogForm.patchValue({
          title: this.blog.title,
          content: this.blog.content,
        });
      },
      (error) => {
        console.error('Failed to fetch blog:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.blogForm.valid && this.blogId) {
      const updatedBlog: Blog = {
        ...this.blog,
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
      };
      console.log('Submitting updated blog:', updatedBlog); 
      this.blogService.updateBlog(this.blogId, updatedBlog).subscribe(
        () => {
          console.log('Blog updated successfully');
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Failed to update blog:', error);
        }
      );
    } else {
      console.error('Form is invalid or Blog ID is not defined');
    }
  }
}
