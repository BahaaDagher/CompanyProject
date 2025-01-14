import { ILogin } from 'src/app/Models/ILogin';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newLogin: ILogin = { email: '', password: '' };
  errorMessages: string[] = [];
  notificationMessage: string | null = null; // For showing temporary messages
  private messageTimeout: any; // Timeout reference

  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    
  }

  onLogin(): void {
    this.clearMessages(); // Clear existing messages
    this.loadingService.show() ; 
    this.authService.login(this.newLogin).subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        console.log(data);
        if (data.token) {
          console.log("ya rollles", JSON.stringify(data.roles)) ; 
          localStorage.setItem('authToken', data.token); // Save token
          localStorage.setItem('userName', data.userName); // Save username
          localStorage.setItem('roles', JSON.stringify(data.roles)); // Save roles
          this.showNotification('Login successful! Redirecting...');
          setTimeout(() => this.router.navigate(['/employees']), 2000); // Redirect after 2 seconds
        }
      },
      error: (error) => {
        this.loadingService.hide() ; 
        console.log("login error",error) ; 
        if (error.error.errors) {
          const validationErrors = error.error.errors;
          for (const field in validationErrors) {
              this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
          }
        } else if (error.error) {
          this.errorMessages.push(error.error);
        } else {
          this.errorMessages.push('Failed to Login. Try again.');
        }
      }
    });
  }
  

  showNotification(message: string): void {
    this.notificationMessage = message;
    clearTimeout(this.messageTimeout); // Clear previous timeout
    this.messageTimeout = setTimeout(() => {
      this.notificationMessage = null; // Hide message after 3 seconds
    }, 3000);
  }

  clearMessages(): void {
    this.errorMessages = [];
    this.notificationMessage = null;
    clearTimeout(this.messageTimeout);
  }
}
