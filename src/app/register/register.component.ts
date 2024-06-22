import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.openSnackBar('Registration successful', 'success-snackbar');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.openSnackBar('Registration failed', 'error-snackbar');
          console.error('Registration failed', error);
        }
      );
    } else {
      this.openSnackBar('Please fill out the form correctly', 'error-snackbar');
    }
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
