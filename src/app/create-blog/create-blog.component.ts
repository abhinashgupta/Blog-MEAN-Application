import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  blogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.blogService.createBlog(this.blogForm.value).subscribe(
        (response) => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Blog creation failed', error);
          alert('Error: ' + error.message);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
