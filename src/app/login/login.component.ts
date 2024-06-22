import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  successMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']); 
          this.successMessage = true;
          this.openSnackBar('Login successful', 'Close', 'success-snackbar');
        },
        (error) => {
          console.error('Login failed', error);
          this.openSnackBar('Login failed', 'Close', 'error-snackbar');
        }
      );
    } else {
      this.openSnackBar(
        'Please fill out the form correctly',
        'Close',
        'error-snackbar'
      );
    }
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
      horizontalPosition: 'center',
    });
  }
}
