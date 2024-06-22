import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() postId!: any;
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.postId) {
      this.commentService
        .getCommentsForPost(this.postId)
        .subscribe((comments) => {
          this.comments = comments;
        });
    }
  }
  addComment(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        postId: this.postId,
        author: this.commentForm.value.author,
        content: this.commentForm.value.content,
      };
      console.log('New Comment:', newComment);
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
