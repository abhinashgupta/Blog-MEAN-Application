import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { Blog } from '../blog.model';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blogId!: any;
  blog: Blog = {
    id: '',
    userId: '',
    title: '',
    content: '',
    summary: '',
    comments: [],
  };
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private commentService: CommentService
  ) {
    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blogId = params['id']; 
      this.loadBlog();
      this.loadComments();
    });
  }

  loadBlog(): void {
    this.blogService.getBlog(this.blogId).subscribe(
      (blog) => {
        this.blog = blog;
      },
      (error) => {
        console.error('Failed to load blog:', error);
      }
    );
  }

  loadComments(): void {
    this.commentService.getCommentsForPost(this.blogId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Failed to load comments:', error);
      }
    );
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        postId: this.blogId,
        author: this.commentForm.value.author,
        content: this.commentForm.value.content,
      };
      this.commentService.addComment(newComment).subscribe(
        (comment) => {
          this.comments.push(comment);
          this.commentForm.reset();
        },
        (error) => {
          console.error('Failed to add comment:', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
