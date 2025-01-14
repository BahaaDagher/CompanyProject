import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { IRegister } from 'src/app/Models/IRegister';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newRegister: IRegister = { firstName: "", lastName: "", userName: "", password: "", email: "" };
  errorMessages: string[] = [];
  notificationMessage: string | null = null;
  private messageTimeout: any;

  constructor(
      private authService: AuthService,
      private router: Router ,
      public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.clearMessages();
    this.loadingService.show() ; 
    this.authService.register(this.newRegister).subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        console.log(data);
        this.showNotification('Registration successful! Redirecting...');
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirect to login after 2 seconds
      },
      error: (error) => {
        this.loadingService.hide() ;
        if (error.error.errors) {
          const validationErrors = error.error.errors;
          for (const field in validationErrors) {
            this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
          }
        } else if (error.error) {
          this.errorMessages.push(error.error);
        } else {
          this.errorMessages.push('Failed to Register. Try again.');
        }
      }
    });
  }

  showNotification(message: string): void {
    this.notificationMessage = message;
    clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

  clearMessages(): void {
    this.errorMessages = [];
    this.notificationMessage = null;
    clearTimeout(this.messageTimeout);
  }
}
