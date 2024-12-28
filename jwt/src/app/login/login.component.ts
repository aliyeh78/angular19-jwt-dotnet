import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHandlerService } from '../services/request-handler.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  providers: [
    // Provide JwtInterceptor if needed (as a global provider)
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private requestHandlerService: RequestHandlerService,
    private router: Router
  ) {}

  onLogin(): void {
    const credentials = { username: this.username, password: this.password };

    this.requestHandlerService.post<any>('auth/login', credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Store the token if login is successful
        localStorage.setItem('token', response.token);
        // Redirect to dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed', error);
      }
    );
  }
}
